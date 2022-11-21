import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { FriendsService } from '../friends/friends.service';
import { ConversationMember } from '../private-conversations/entities/conversation-member.entity';
import { PrismaService } from '../prisma/prisma.service';
import { PrivateGroup } from './entities/private-group.entity';
import { AuthUser } from '../auth/entities/auth-user.entity';
import { EditNameInput } from './dto/edit-name.input';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class PrivateGroupsService {
  constructor(private prisma: PrismaService, private friendsService: FriendsService) {}

  async findAll(userId: number): Promise<PrivateGroup[]> {
    const items = await this.prisma.membersInPrivateGroups.findMany({
      where: { memberId: userId },
      include: {
        privateGroup: {
          select: { id: true, name: true, createdAt: true },
        },
      },
    });

    return items.map(({ privateGroup }) => {
      const { id, name, createdAt } = privateGroup;
      return { id, name, createdAt };
    });
  }

  async findGroupMembersByIds(ids: number[]) {
    const groups = await this.prisma.privateGroup.findMany({
      where: { id: { in: ids } },
      include: {
        members: {
          include: {
            member: true,
          },
        },
      },
    });

    const membersMap = new Map<number, ConversationMember[]>(
      groups.map((group) => [
        group.id,
        group.members.map(({ member }) => {
          const { id, username } = member;
          return { id, username };
        }),
      ]),
    );

    return membersMap;
  }

  async findGroupMembersByBatch(groupsIds: number[]): Promise<Array<ConversationMember[]>> {
    const membersMap = await this.findGroupMembersByIds(groupsIds);
    return groupsIds.map((groupId) => membersMap.get(groupId));
  }

  async create(membersIds: number[], authUser: AuthUser): Promise<PrivateGroup> {
    const uniqueIds = [...new Set([...membersIds, authUser.id])];
    if (uniqueIds.length > 10 || uniqueIds.length === 0)
      throw new BadRequestException('Un nouveau groupe ne peut avoir que 10 membres au maximum et 1 au minimum !');
    const friends = await this.friendsService.findAll(authUser.id);
    const groupMembers = uniqueIds.map((memberId) => {
      if (memberId === authUser.id) return { id: authUser.id, username: authUser.username };
      const member = friends.find((friend) => friend.id === memberId);
      if (!member) throw new ForbiddenException('Un ou plusieurs des utilisateurs ne font pas partie de tes amis !');
      return { id: memberId, username: member.username };
    });

    const groupName = groupMembers.map(({ username }) => username).join(', ');
    return this.prisma.privateGroup.create({
      data: {
        name: groupName,
        members: {
          createMany: { data: groupMembers.map((member) => ({ memberId: member.id })) },
        },
      },
      select: { id: true, name: true, createdAt: true },
    });
  }

  async editName(editNameInput: EditNameInput, userId: number) {
    const { groupId, name } = editNameInput;
    await this.canEdit(groupId, userId);
    return this.prisma.privateGroup.update({
      where: { id: groupId },
      data: { name },
    });
  }

  async addMember(groupId: number, membersIds: number[], userId: number): Promise<PrivateGroup> {
    const [currentMembersIds, friends] = await Promise.all([this.canEdit(groupId, userId), this.friendsService.findAll(userId)]);
    const uniqueIds = [...new Set(membersIds)];
    if (currentMembersIds.length + uniqueIds.length > 10)
      throw new BadRequestException('Un nouveau groupe ne peut avoir que 10 membres au maximum et 3 au minimum !');

    const newGroupMembers = uniqueIds.map((memberId) => {
      if (currentMembersIds.includes(memberId)) throw new BadRequestException('Un ou plusieurs des utilisateurs font déjà partie de ce groupe');
      if (!friends.some((friend) => friend.id === memberId))
        throw new ForbiddenException('Un ou plusieurs des utilisateurs ne font pas partie de vos amis !');
      return { memberId };
    });

    return this.prisma.privateGroup.update({
      where: { id: groupId },
      data: {
        members: {
          createMany: { data: newGroupMembers },
        },
      },
    });
  }

  async leave(groupId: number, userId: number): Promise<PrivateGroup> {
    try {
      const membersInPrivateGroups = await this.prisma.membersInPrivateGroups.delete({
        where: { privateGroupId_memberId: { privateGroupId: groupId, memberId: userId } },
        include: { privateGroup: true },
      });

      const numMembers = await this.prisma.membersInPrivateGroups.count({ where: { privateGroupId: groupId } });
      if (numMembers === 0) await this.prisma.privateGroup.delete({ where: { id: groupId } });
      return membersInPrivateGroups.privateGroup;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025')
        throw new BadRequestException('Vous ne faites pas partie de ce groupe !');
      throw err;
    }
  }

  async canEdit(groupId: number, userId: number) {
    const group = await this.prisma.privateGroup.findUnique({
      where: { id: groupId },
      include: {
        members: { select: { memberId: true } },
      },
    });
    if (!group) throw new NotFoundException("Ce groupe n'existe pas !");
    const membersIds = group.members.map((member) => member.memberId);
    if (!membersIds.includes(userId)) throw new ForbiddenException('Vous ne faites pas partie de ce groupe !');
    return membersIds;
  }
}
