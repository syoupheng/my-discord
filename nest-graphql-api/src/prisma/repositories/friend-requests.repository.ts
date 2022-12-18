import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FriendRequestRepository {
  constructor(private prisma: PrismaService) {}

  findOne(uniqueInput: Prisma.FriendRequestSenderIdRecipientIdCompoundUniqueInput) {
    return this.prisma.friendRequest.findUnique({
      where: {
        senderId_recipientId: uniqueInput,
      },
    });
  }

  create(uniqueInput: Prisma.FriendRequestSenderIdRecipientIdCompoundUniqueInput) {
    return this.prisma.friendRequest.create({ data: uniqueInput });
  }

  findAllByUserId(userId: number) {
    return this.prisma.friendRequest.findMany({
      where: {
        AND: [
          {
            OR: [{ senderId: userId }, { recipientId: userId }],
          },
          {
            OR: [{ senderId: userId }, { ignored: false }],
          },
        ],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            createdAt: true,
          },
        },
        recipient: {
          select: {
            id: true,
            username: true,
            createdAt: true,
          },
        },
      },
    });
  }

  update(uniqueInput: Prisma.FriendRequestSenderIdRecipientIdCompoundUniqueInput, payload: Prisma.FriendRequestUpdateInput) {
    return this.prisma.friendRequest.update({
      where: {
        senderId_recipientId: uniqueInput,
      },
      data: payload,
    });
  }

  delete(uniqueInput: Prisma.FriendRequestSenderIdRecipientIdCompoundUniqueInput) {
    return this.prisma.friendRequest.delete({
      where: {
        senderId_recipientId: uniqueInput,
      },
    });
  }
}
