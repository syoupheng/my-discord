import { Injectable, NotFoundException } from '@nestjs/common';
import { PrivateConversation } from './entities/private-conversation.entity';
import { PrivateConversationsRepository } from '../prisma/repositories/private-conversations.repository';
import { ChannelMember } from '../users/entities/channel-member.entity';
import { UsersRepository } from '../prisma/repositories/users.repository';

@Injectable()
export class PrivateConversationsService {
  constructor(private usersRepository: UsersRepository, private privateConversationsRepository: PrivateConversationsRepository) {}

  async findAll(userId: number): Promise<PrivateConversation[]> {
    const rawConversations = await this.privateConversationsRepository.findAllByUserId(userId);
    const result: PrivateConversation[] = [];
    rawConversations.forEach(({ id, members, createdAt }) => {
      const memberId = members.find(({ memberId }) => userId !== memberId)?.memberId;
      if (memberId) result.push({ id, createdAt, memberId });
    });
    return result;
  }

  async findConversationMembersByIds(ids: number[]): Promise<ChannelMember[]> {
    return this.usersRepository.findManyByIds(ids);
  }

  async findConversationMembersByBatch(ids: number[]): Promise<(ChannelMember | Error)[]> {
    const members = await this.findConversationMembersByIds(ids);
    return ids.map((id) => members.find((member) => member.id === id) ?? Error(`Conversation member ${id} not found`));
  }

  async findById(conversationId: number) {
    const conversation = await this.privateConversationsRepository.findById(conversationId);
    if (!conversation) throw new NotFoundException("Cette conversation n'existe pas !");
    return conversation;
  }

  async show(friendId: number, userId: number): Promise<PrivateConversation> {
    const conversation = await this.privateConversationsRepository.findByFriendIds(friendId, userId);
    if (!conversation) throw new NotFoundException("Il n'y a pas de conversation entre vous deux !");
    const { id, createdAt } = conversation;
    await this.privateConversationsRepository.updateMemberInChannel({
      memberId: userId,
      channelId: id,
      payload: {
        hidden: false,
      },
    });
    return { id, createdAt, memberId: friendId };
  }

  async hide(conversationId: number, userId: number): Promise<PrivateConversation> {
    const conversation = await this.privateConversationsRepository.findById(conversationId);
    if (!conversation) throw new NotFoundException("Cette conversation n'existe pas !");
    const { createdAt, members } = conversation;
    await this.privateConversationsRepository.updateMemberInChannel({ memberId: userId, channelId: conversationId, payload: { hidden: true } });
    const member = members.find(({ memberId }) => memberId !== userId);
    if (!member) throw new NotFoundException("Cette conversation n'existe pas !");
    return { id: conversationId, createdAt, memberId: member.memberId };
  }
}
