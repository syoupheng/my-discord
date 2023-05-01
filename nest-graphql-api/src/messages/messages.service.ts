import { BadRequestException, HttpException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../prisma/repositories/users.repository';
import { MessageRepository } from '../prisma/repositories/message.repository';
import { SendMessageInput } from './dto/send-message.input';
import { Message } from './entities/message.entity';
import { MessageType } from './enums/message-type.enum';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ChannelRepository } from '../prisma/repositories/channel.repository';
import { ReferencedMessage } from './entities/referenced-message.entity';
import { ChannelMember } from 'src/users/entities/channel-member.entity';
import { IPagination } from './interfaces/pagination.interface';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { PubSub } from 'graphql-subscriptions';
import { ChatGptService } from '../chat-gpt/chat-gpt.service';
import { MembersInChannels, User } from '@prisma/client';
import { ChatCompletionRequestMessage } from 'openai';

type MembersInChannel = MembersInChannels & { member: Pick<User, 'chatGptRole' | 'username'> };

@Injectable()
export class MessagesService {
  constructor(
    private messageRepository: MessageRepository,
    private usersRepository: UsersRepository,
    private channelRepository: ChannelRepository,
    private chatGptService: ChatGptService,
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {}

  async findAll(userId: number, channelId: number, pagination: IPagination) {
    const membersInChannels = await this.channelRepository.findMembersByChannelId(channelId);
    if (!membersInChannels.some(({ memberId }) => memberId === userId)) throw new UnauthorizedException('Tu ne fais pas partie de ce channel !');
    const messages = await this.messageRepository.findManyByChannelId(channelId, { ...pagination, take: pagination.take + 1 });
    if (messages.length === pagination.take + 1) return { cursor: messages[1].createdAt, messages: messages.slice(1) };
    return { cursor: null, messages };
  }

  async send(payload: SendMessageInput, authorId: number): Promise<Message> {
    const membersInChannels = await this.channelRepository.findMembersByChannelId(payload.channelId);
    if (!membersInChannels.some(({ memberId }) => memberId === authorId)) throw new UnauthorizedException('Tu ne fais pas partie de ce channel !');
    const membersInChannelsIds = membersInChannels.map((member) => member.memberId);
    const mentionsIds = [...new Set(this.getMentionsIdsFromContent(payload.content).filter((mentionId) => membersInChannelsIds.includes(mentionId)))];
    try {
      const newMessage = await this.messageRepository.create({
        ...payload,
        authorId,
        type: MessageType.NORMAL,
        mentionsIds,
        notifiedUsersIds: membersInChannelsIds.filter((id) => authorId !== id),
      });
      const result = { ...newMessage, type: MessageType[newMessage.type] };
      this.pubSub.publish('messageReceived', {
        messageReceived: { payload: result, membersIds: membersInChannelsIds.filter((id) => id !== authorId) },
      });
      const isAuthorChatGptUser = !!membersInChannels.find((member) => member.memberId === authorId)?.member.chatGptRole;
      if (!isAuthorChatGptUser) this.callChatGPT(payload.channelId, mentionsIds, membersInChannels, result);
      return result;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025')
        throw new BadRequestException('Il y a eu un problème lors de la création de ce message !');
    }
  }

  async findMessageAuthorsByIds(ids: number[]): Promise<ChannelMember[]> {
    return this.usersRepository.findManyByIds(ids);
  }

  async findMessageAuthorsByBatch(ids: number[]): Promise<(ChannelMember | null)[]> {
    const authors = await this.findMessageAuthorsByIds(ids);
    return ids.map((id) => authors.find((author) => author.id === id) ?? null);
  }

  async findReferencedMessagesByIds(ids: number[]): Promise<ReferencedMessage[]> {
    return this.messageRepository.findManyByIds(ids);
  }

  async findReferencedMessagesByBatch(ids: number[]): Promise<(ReferencedMessage | null)[]> {
    const refMessages = await this.findReferencedMessagesByIds(ids);
    return ids.map((id) => refMessages.find((msg) => msg.id === id) ?? null);
  }

  getMentionsIdsFromContent(content: string): number[] {
    const regex = /<@[1-9]\d*>/g;
    const matches = content.match(regex);
    return matches ? matches.map((match) => parseInt(match.slice(2, -1))) : [];
  }

  findMentionsByMessageIds(ids: number[]) {
    return this.messageRepository.findMentionsByIds(ids);
  }

  async findMentionsByBatch(messagesIds: number[]): Promise<Array<ChannelMember[]>> {
    const mentions = await this.findMentionsByMessageIds(messagesIds);
    return messagesIds.map((messageId) => {
      const mentionsOnMessage = mentions.filter((mention) => mention.messageId === messageId);
      return mentionsOnMessage.map(({ mentionId, mention }) => ({ id: mentionId, username: mention.username, createdAt: mention.createdAt }));
    });
  }

  async delete(messageId: number, userId: number) {
    const message = await this.messageRepository.findById(messageId);
    if (!message) throw new NotFoundException('This message does not exist !');
    const membersInChannels = await this.channelRepository.findMembersByChannelId(message.channelId);
    if (!membersInChannels.some(({ memberId }) => memberId === userId)) throw new UnauthorizedException('Tu ne fais pas partie de ce channel !');
    const membersInChannelsIds = [...new Set(membersInChannels)].map(({ memberId }) => memberId);
    await this.messageRepository.delete(messageId);
    this.pubSub.publish('messageDeleted', {
      messageDeleted: { message, membersIds: membersInChannelsIds.filter((id) => id !== userId) },
    });
    return { success: true };
  }

  async isAuthor(messageId: number, userId: number) {
    const message = await this.messageRepository.findById(messageId);
    if (!message) throw new NotFoundException("Ce message n'existe pas !");
    return message.authorId === userId;
  }

  async isChannelMember(channelId: number, userId: number) {
    const membersInChannels = await this.channelRepository.findMembersByChannelId(channelId);
    if (!membersInChannels.some(({ memberId }) => memberId === userId)) throw new UnauthorizedException('Tu ne fais pas partie de ce channel !');
    return membersInChannels;
  }

  async notifyTyping(channelId: number, user: any) {
    const { id: userId, username } = user;
    const membersInChannels = await this.isChannelMember(channelId, userId);
    this.publishTypingNotification(channelId, userId, username, membersInChannels);
    return 'received';
  }

  publishTypingNotification(channelId: number, userId: number, username: string, membersInChannels: MembersInChannel[]) {
    this.pubSub.publish('userTyping', {
      channelId,
      userId,
      username,
      membersInChannels: membersInChannels.filter((member) => member.memberId !== userId),
    });
  }

  async callChatGPT(channelId: number, mentionsIds: number[], membersInChannel: MembersInChannel[], message: Message) {
    let chatGptUsers = membersInChannel.filter((member) => member.member.chatGptRole);
    if (mentionsIds.length) chatGptUsers = chatGptUsers.filter((member) => mentionsIds.includes(member.memberId));
    if (!chatGptUsers.length) return;
    const chatGptUser = chatGptUsers[Math.floor(Math.random() * chatGptUsers.length)];

    const latestMessages = await this.messageRepository.findManyByChannelId(channelId, { cursor: message.createdAt.toISOString(), take: 4 });
    const chatGptMessages: ChatCompletionRequestMessage[] = [
      ...latestMessages,
      { ...message, content: `As ${chatGptUser.member.chatGptRole} ${message.content}` },
    ].map((message) => ({
      role: message.authorId === chatGptUser.memberId ? 'assistant' : 'user',
      content: message.content,
    }));
    chatGptMessages.unshift({
      role: 'system',
      content: `You are ${chatGptUser.member.chatGptRole}. Do not mention the fact that you are AI language model.`,
    });
    this.publishTypingNotification(channelId, chatGptUser.memberId, chatGptUser.member.username, membersInChannel);
    const interval = setInterval(() => {
      this.publishTypingNotification(channelId, chatGptUser.memberId, chatGptUser.member.username, membersInChannel);
    }, 4000);
    try {
      const { data } = await this.chatGptService.createChatCompletion(chatGptMessages);
      clearInterval(interval);
      if (!data) return;
      const response = data.choices[0].message.content;
      this.send({ channelId, content: response, respondsToId: message.id }, chatGptUser.memberId);
    } catch (err: any) {
      clearInterval(interval);
      if ('response' in err && err.response?.status === 429) {
        console.error('Too many requests');
      } else console.error(err);
    }
  }
}
