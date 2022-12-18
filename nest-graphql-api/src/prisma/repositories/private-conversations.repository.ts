import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

interface IMembersInChannelsUpdateInput {
  memberId: number;
  channelId: number;
  payload: Prisma.MembersInChannelsUpdateInput;
}

interface IMembersInChannelsUpdateManyInput extends Omit<IMembersInChannelsUpdateInput, 'memberId'> {
  membersIds: number[];
}

@Injectable()
export class PrivateConversationsRepository {
  constructor(private prisma: PrismaService) {}

  findByFriendIds(friend_1_id: number, friend_2_id: number) {
    return this.prisma.channel.findFirst({
      where: {
        type: 'PRIVATE_CONVERSATION',
        members: {
          every: {
            memberId: { in: [friend_1_id, friend_2_id] },
          },
        },
      },
    });
  }

  findById(conversationId: number) {
    return this.prisma.channel.findFirst({
      where: { id: conversationId, type: 'PRIVATE_CONVERSATION' },
      include: {
        members: {
          select: { memberId: true },
        },
      },
    });
  }

  findAllByUserId(userId: number) {
    return this.prisma.channel.findMany({
      where: {
        type: 'PRIVATE_CONVERSATION',
        members: {
          some: { memberId: userId, hidden: false },
        },
      },
      include: {
        members: {
          select: { memberId: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  create(friend_1_id: number, friend_2_id: number) {
    return this.prisma.channel.create({
      data: {
        type: 'PRIVATE_CONVERSATION',
        members: {
          createMany: {
            data: [{ memberId: friend_1_id }, { memberId: friend_2_id }],
          },
        },
      },
    });
  }

  updateMemberInChannel({ memberId, channelId, payload }: IMembersInChannelsUpdateInput) {
    return this.prisma.membersInChannels.update({
      where: { channelId_memberId: { channelId, memberId } },
      data: payload,
    });
  }

  updateManyMembersInChannels({ membersIds, channelId, payload }: IMembersInChannelsUpdateManyInput) {
    return this.prisma.membersInChannels.updateMany({
      where: {
        channelId,
        memberId: { in: membersIds },
      },
      data: payload,
    });
  }
}
