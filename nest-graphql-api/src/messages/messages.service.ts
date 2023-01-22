import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
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

@Injectable()
export class MessagesService {
  constructor(
    private messageRepository: MessageRepository,
    private usersRepository: UsersRepository,
    private channelRepository: ChannelRepository,
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {}

  async findAll(userId: number, channelId: number, pagination: IPagination) {
    const membersInChannels = await this.channelRepository.findMembersByChannelId(channelId);
    if (!membersInChannels.some(({ memberId }) => memberId === userId)) throw new UnauthorizedException('Tu ne fais pas partie de ce channel !');
    const messages = await this.messageRepository.findManyByChannelId(channelId, { ...pagination, take: pagination.take + 1 });
    if (messages.length === pagination.take + 1) return { cursor: messages.at(-2).createdAt, messages: messages.slice(0, -1) };
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
      });
      const result = { ...newMessage, type: MessageType[newMessage.type] };
      this.pubSub.publish('messageReceived', {
        messageReceived: { payload: result, membersIds: membersInChannelsIds.filter((id) => id !== authorId) },
      });
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
}
