import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrivateConversation } from './entities/private-conversation.entity';
import { ConversationMember } from './entities/conversation-member.entity';

@Injectable()
export class PrivateConversationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number): Promise<PrivateConversation[]> {
    const rawConversations = await this.prisma.privateConversation.findMany({
      where: {
        OR: [
          { friend_1_id: userId, display1: true },
          { friend_2_id: userId, display2: true },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });

    return rawConversations.map(({ id, friend_1_id, friend_2_id, createdAt }) => ({
      id,
      createdAt,
      memberId: userId === friend_1_id ? friend_2_id : friend_1_id,
    }));
  }

  async findConversationMember(memberId: number): Promise<ConversationMember> {
    const member = await this.prisma.user.findUnique({ where: { id: memberId } });
    if (!member) throw new NotFoundException("Cet utilisateur n'existe pas");
    const { id, username } = member;
    return { id, username };
  }

  async findConversationMembersByIds(ids: number[]): Promise<ConversationMember[]> {
    return this.prisma.user.findMany({
      where: {
        id: { in: ids },
      },
      select: { id: true, username: true },
    });
  }

  async findConversationMembersByBatch(ids: number[]): Promise<(ConversationMember | null)[]> {
    const members = await this.findConversationMembersByIds(ids);
    return ids.map((id) => members.find((member) => member.id === id) ?? null);
  }

  async findById(conversationId: number) {
    const conversation = await this.prisma.privateConversation.findUnique({ where: { id: conversationId } });
    if (!conversation) throw new NotFoundException("Cette conversation n'existe pas !");
    return conversation;
  }

  async show(friendId: number, userId: number): Promise<PrivateConversation> {
    const conversation = await this.prisma.privateConversation.findFirst({
      where: {
        OR: [
          { friend_1_id: friendId, friend_2_id: userId },
          { friend_1_id: userId, friend_2_id: friendId },
        ],
      },
    });

    if (!conversation) throw new NotFoundException("Il n'y a pas de conversation entre vous deux !");
    const { friend_1_id, friend_2_id, display1, display2, id, createdAt } = conversation;
    let payload = {};
    if (userId === friend_1_id && !display1) {
      payload = { display1: true };
    } else if (userId === friend_2_id && !display2) {
      payload = { display2: true };
    } else return { id, createdAt, memberId: friendId };

    await this.prisma.privateConversation.update({
      where: { id },
      data: payload,
    });

    return { id: conversation.id, createdAt, memberId: friendId };
  }

  async hide(conversationId: number, userId: number): Promise<PrivateConversation> {
    const { friend_1_id, friend_2_id, display1, display2, createdAt } = await this.findById(conversationId);

    let payload = {};
    if (userId === friend_1_id && display1) {
      payload = { display1: false };
    } else if (userId === friend_2_id && display2) {
      payload = { display2: false };
    } else throw new ForbiddenException('Vous ne pouvez pas effectuer cette action !');

    await this.prisma.privateConversation.update({
      where: { id: conversationId },
      data: payload,
    });

    return { id: conversationId, createdAt, memberId: userId === friend_1_id ? friend_2_id : friend_1_id };
  }
}
