import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrivateConversationsRepository {
  constructor(private prisma: PrismaService) {}

  findByFriendIds(friend_1_id: number, friend_2_id: number) {
    return this.prisma.privateConversation.findFirst({
      where: {
        OR: [
          { friend_1_id, friend_2_id },
          { friend_1_id: friend_2_id, friend_2_id: friend_1_id },
        ],
      },
    });
  }

  findById(conversationId: number) {
    return this.prisma.privateConversation.findUnique({ where: { id: conversationId } });
  }

  findAllByUserId(userId: number) {
    return this.prisma.privateConversation.findMany({
      where: {
        OR: [
          { friend_1_id: userId, display1: true },
          { friend_2_id: userId, display2: true },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  create(friend_1_id: number, friend_2_id: number) {
    return this.prisma.privateConversation.create({
      data: { friend_1_id, friend_2_id },
    });
  }

  updateByFriendIds(friend_1_id: number, friend_2_id: number, payload: Prisma.PrivateConversationUpdateInput) {
    return this.prisma.privateConversation.update({
      where: { friend_1_id_friend_2_id: { friend_1_id, friend_2_id } },
      data: payload,
    });
  }

  updateById(conversationId: number, payload: Prisma.PrivateConversationUpdateInput) {
    return this.prisma.privateConversation.update({
      where: { id: conversationId },
      data: payload,
    });
  }
}
