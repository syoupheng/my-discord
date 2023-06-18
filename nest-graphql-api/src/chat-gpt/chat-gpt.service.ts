import { Injectable } from '@nestjs/common';
import { ChatCompletionRequestMessage, Configuration, CreateChatCompletionResponse, OpenAIApi } from 'openai';
import { Message } from '../messages/entities/message.entity';
import { MessageRepository } from '../prisma/repositories/message.repository';
import { MembersInChannel } from '../types';

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const OPENAI = new OpenAIApi(configuration);

@Injectable()
export class ChatGptService {
  constructor(private messageRepository: MessageRepository) {}

  createChatCompletion(messages: ChatCompletionRequestMessage[]): Promise<{ data: CreateChatCompletionResponse }> {
    return OPENAI.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    });
  }

  getChatGptUserInChannel(membersInChannel: MembersInChannel[], mentionsIds: number[]) {
    let chatGptUsers = membersInChannel.filter(({ member }) => member.chatGptRole);
    if (mentionsIds.length) chatGptUsers = chatGptUsers.filter((member) => mentionsIds.includes(member.memberId));
    if (!chatGptUsers.length) return;
    return chatGptUsers[Math.floor(Math.random() * chatGptUsers.length)];
  }

  async buildChatGptPrompt(message: Message, chatGptUser: MembersInChannel, channelId: number) {
    const HISTORY_LENGTH = 4;

    const latestMessages = await this.messageRepository.findManyByChannelId(channelId, {
      cursor: message.createdAt.toISOString(),
      take: HISTORY_LENGTH,
    });
    const chatGptMessages: ChatCompletionRequestMessage[] = [
      ...latestMessages,
      { ...message, content: `As ${chatGptUser.member.chatGptRole} ${message.content}` },
    ].map((message) => ({
      role: message.authorId === chatGptUser.memberId ? 'assistant' : 'user',
      content: message.content,
    }));
    chatGptMessages.unshift({
      role: 'system',
      content: `Behave as if you were ${chatGptUser.member.chatGptRole}. Do not mention the fact that you are AI language model.`,
    });
    return chatGptMessages;
  }
}
