import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ConversationMember } from 'src/private-conversations/entities/conversation-member.entity';
import { PrismaService } from '../prisma.service';

interface IGroupCreateInput {
  name: string;
  members: ConversationMember[];
}

@Injectable()
export class PrivateGroupsRepository {
  constructor(private prisma: PrismaService) {}

  findById(groupId: number) {
    return this.prisma.privateGroup.findUnique({
      where: { id: groupId },
      include: {
        members: { select: { memberId: true } },
      },
    });
  }

  findManyByMemberId(memberId: number) {
    return this.prisma.membersInPrivateGroups.findMany({
      where: { memberId },
      include: {
        privateGroup: {
          select: { id: true, name: true, createdAt: true },
        },
      },
    });
  }

  findMembersByGroupIds(groupIds: number[]) {
    return this.prisma.privateGroup.findMany({
      where: { id: { in: groupIds } },
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
    return this.prisma.privateGroup.create({
      data: {
        name,
        members: {
          createMany: { data: members.map((member) => ({ memberId: member.id })) },
        },
      },
      select: { id: true, name: true, createdAt: true },
    });
  }

  update(groupId: number, payload: Prisma.PrivateGroupUpdateInput) {
    return this.prisma.privateGroup.update({
      where: { id: groupId },
      data: payload,
    });
  }

  delete(groupId) {
    return this.prisma.privateGroup.delete({ where: { id: groupId } });
  }

  deleteMember(groupId: number, memberId: number) {
    return this.prisma.membersInPrivateGroups.delete({
      where: { privateGroupId_memberId: { privateGroupId: groupId, memberId } },
      include: { privateGroup: true },
    });
  }

  countMembersByGroupId(groupId: number) {
    return this.prisma.membersInPrivateGroups.count({ where: { privateGroupId: groupId } });
  }
}
