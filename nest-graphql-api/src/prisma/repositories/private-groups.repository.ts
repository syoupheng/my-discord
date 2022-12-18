import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ChannelMember } from 'src/users/entities/channel-member.entity';
import { PrismaService } from '../prisma.service';

interface IGroupCreateInput {
  name: string;
  members: ChannelMember[];
}

@Injectable()
export class PrivateGroupsRepository {
  constructor(private prisma: PrismaService) {}

  findById(groupId: number) {
    return this.prisma.channel.findFirst({
      where: { id: groupId, type: 'PRIVATE_GROUP' },
      include: {
        members: { select: { memberId: true } },
      },
    });
  }

  findManyByMemberId(memberId: number) {
    return this.prisma.membersInChannels.findMany({
      where: {
        memberId,
        channel: {
          type: 'PRIVATE_GROUP',
        },
      },
      include: {
        channel: {
          select: { id: true, name: true, createdAt: true },
        },
      },
    });
  }

  findMembersByGroupIds(groupIds: number[]) {
    return this.prisma.channel.findMany({
      where: { id: { in: groupIds }, type: 'PRIVATE_GROUP' },
      include: {
        members: {
          include: {
            member: true,
          },
        },
      },
    });
  }

  create({ name, members }: IGroupCreateInput) {
    return this.prisma.channel.create({
      data: {
        type: 'PRIVATE_GROUP',
        name,
        members: {
          createMany: { data: members.map((member) => ({ memberId: member.id })) },
        },
      },
      select: { id: true, name: true, createdAt: true },
    });
  }

  update(groupId: number, payload: Prisma.ChannelUpdateInput) {
    return this.prisma.channel.update({
      where: { id: groupId },
      data: payload,
    });
  }

  delete(groupId: number) {
    return this.prisma.channel.deleteMany({ where: { id: groupId, type: 'PRIVATE_GROUP' } });
  }

  deleteMember(groupId: number, memberId: number) {
    return this.prisma.membersInChannels.delete({
      where: { channelId_memberId: { channelId: groupId, memberId } },
      include: { channel: true },
    });
  }

  countMembersByGroupId(groupId: number) {
    return this.prisma.channel.count({ where: { id: groupId, type: 'PRIVATE_GROUP' } });
  }
}
