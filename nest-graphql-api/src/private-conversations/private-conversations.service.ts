import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrivateConversation } from './entities/private-conversation.entity';
import { PrivateConversationsRepository } from '../prisma/repositories/private-conversations.repository';
import { ChannelMember } from '../users/entities/channel-member.entity';

@Injectable()
export class PrivateConversationsService {
  constructor(private prisma: PrismaService, private privateConversationsRepository: PrivateConversationsRepository) {}

  async findAll(userId: number): Promise<PrivateConversation[]> {
    const rawConversations = await this.privateConversationsRepository.findAllByUserId(userId);
    return rawConversations.map(({ id, members, createdAt }) => ({
      id,
      createdAt,
      memberId: members.find(({ memberId }) => userId !== memberId).memberId,
    }));
  }

  async findConversationMembersByIds(ids: number[]): Promise<ChannelMember[]> {
    return this.prisma.user.findMany({
      where: {
        id: { in: ids },
      },
      select: { id: true, username: true, createdAt: true, avatarColor: true },
    });
  }

  async findConversationMembersByBatch(ids: number[]): Promise<(ChannelMember | null)[]> {
    const members = await this.findConversationMembersByIds(ids);
    return ids.map((id) => members.find((member) => member.id === id) ?? null);
  }

  async findById(conversationId: number): Promise<PrivateConversation> {
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
    const { createdAt, members } = await this.privateConversationsRepository.findById(conversationId);
    await this.privateConversationsRepository.updateMemberInChannel({ memberId: userId, channelId: conversationId, payload: { hidden: true } });
    const { memberId } = members.find(({ memberId }) => memberId !== userId);
    return { id: conversationId, createdAt, memberId };
  }
}
