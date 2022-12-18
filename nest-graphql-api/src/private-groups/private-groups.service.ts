import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { FriendsService } from '../friends/friends.service';
import { PrivateGroup } from './entities/private-group.entity';
import { AuthUser } from '../auth/entities/auth-user.entity';
import { EditNameInput } from './dto/edit-name.input';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrivateGroupsRepository } from '../prisma/repositories/private-groups.repository';
import { ChannelMember } from 'src/users/entities/channel-member.entity';

@Injectable()
export class PrivateGroupsService {
  constructor(private friendsService: FriendsService, private privateGroupsRepository: PrivateGroupsRepository) {}

  async findAll(userId: number): Promise<PrivateGroup[]> {
    const items = await this.privateGroupsRepository.findManyByMemberId(userId);
    return items.map(({ channel }) => {
      const { id, name, createdAt } = channel;
      return { id, name, createdAt };
    });
  }

  async findGroupMembersByIds(ids: number[]) {
    const groups = await this.privateGroupsRepository.findMembersByGroupIds(ids);
    const membersMap = new Map<number, ChannelMember[]>(
      groups.map((group) => [
        group.id,
        group.members.map(({ member }) => {
          const { id, username, createdAt } = member;
          return { id, username, createdAt };
        }),
      ]),
    );
    return membersMap;
  }

  async findGroupMembersByBatch(groupsIds: number[]): Promise<Array<ChannelMember[]>> {
    const membersMap = await this.findGroupMembersByIds(groupsIds);
    return groupsIds.map((groupId) => membersMap.get(groupId));
  }

  async create(membersIds: number[], authUser: AuthUser): Promise<PrivateGroup> {
    const uniqueIds = [...new Set([...membersIds, authUser.id])];
    if (uniqueIds.length > 10 || uniqueIds.length === 0)
      throw new BadRequestException('Un nouveau groupe ne peut avoir que 10 membres au maximum et 1 au minimum !');
    const friends = await this.friendsService.findAll(authUser.id);
    const groupMembers = uniqueIds.map((memberId) => {
      if (memberId === authUser.id) return { id: authUser.id, username: authUser.username, createdAt: authUser.createdAt };
      const member = friends.find((friend) => friend.id === memberId);
      if (!member) throw new ForbiddenException('Un ou plusieurs des utilisateurs ne font pas partie de tes amis !');
      return { id: memberId, username: member.username, createdAt: member.createdAt };
    });

    const groupName = groupMembers.map(({ username }) => username).join(', ');
    return this.privateGroupsRepository.create({ name: groupName, members: groupMembers });
  }

  async editName(editNameInput: EditNameInput, userId: number) {
    const { groupId, name } = editNameInput;
    await this.canEdit(groupId, userId);
    return this.privateGroupsRepository.update(groupId, { name });
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

    return this.privateGroupsRepository.update(groupId, {
      members: {
        createMany: { data: newGroupMembers },
      },
    });
  }

  async leave(groupId: number, userId: number): Promise<PrivateGroup> {
    try {
      const membersInPrivateGroups = await this.privateGroupsRepository.deleteMember(groupId, userId);
      const numMembers = await this.privateGroupsRepository.countMembersByGroupId(groupId);
      if (numMembers === 0) await this.privateGroupsRepository.delete(groupId);
      return membersInPrivateGroups.channel;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025')
        throw new BadRequestException('Vous ne faites pas partie de ce groupe !');
      throw err;
    }
  }

  async canEdit(groupId: number, userId: number) {
    const group = await this.privateGroupsRepository.findById(groupId);
    if (!group) throw new NotFoundException("Ce groupe n'existe pas !");
    const membersIds = group.members.map((member) => member.memberId);
    if (!membersIds.includes(userId)) throw new ForbiddenException('Vous ne faites pas partie de ce groupe !');
    return membersIds;
  }
}
