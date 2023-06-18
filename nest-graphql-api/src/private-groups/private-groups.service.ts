import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FriendsService } from '../friends/friends.service';
import { PrivateGroup } from './entities/private-group.entity';
import { AuthUser } from '../auth/entities/auth-user.entity';
import { EditNameInput } from './dto/edit-name.input';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrivateGroupsRepository } from '../prisma/repositories/private-groups.repository';
import { ChannelMember } from '../users/entities/channel-member.entity';
import { AvatarService } from '../avatar/avatar.service';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class PrivateGroupsService {
  constructor(
    private friendsService: FriendsService,
    private privateGroupsRepository: PrivateGroupsRepository,
    private avatarService: AvatarService,
    // @ts-expect-error need to upgrade nestjs ?
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {}

  async findAll(userId: number): Promise<PrivateGroup[]> {
    const items = await this.privateGroupsRepository.findManyByMemberId(userId);
    return items.map(({ channel }) => channel);
  }

  async findGroupMembersByIds(groupsIds: number[]) {
    const groups = await this.privateGroupsRepository.findMembersByGroupIds(groupsIds);
    const membersMap = new Map<number, ChannelMember[]>(groups.map((group) => [group.id, group.members.map(({ member }) => member)]));
    return membersMap;
  }

  async findGroupMembersByBatch(groupsIds: number[]): Promise<Array<ChannelMember[] | Error>> {
    const membersMap = await this.findGroupMembersByIds(groupsIds);
    return groupsIds.map((groupId) => membersMap.get(groupId) ?? Error(`Group ${groupId} not found`));
  }

  async create(membersIds: number[], authUser: AuthUser): Promise<PrivateGroup> {
    const uniqueIds = [...new Set([...membersIds, authUser.id])];
    if (uniqueIds.length > 10 || uniqueIds.length === 0)
      throw new BadRequestException('Un nouveau groupe ne peut avoir que 10 membres au maximum et 1 au minimum !');
    const friends = await this.friendsService.findAll(authUser.id);
    const groupMembers = uniqueIds.map((memberId) => {
      if (memberId === authUser.id) return authUser;
      const member = friends.find((friend) => friend.id === memberId);
      if (!member) throw new ForbiddenException('Un ou plusieurs des utilisateurs ne font pas partie de tes amis !');
      return member;
    });

    const groupName = groupMembers.map(({ username }) => username).join(', ');
    const newGroup = await this.privateGroupsRepository.create({
      name: groupName,
      members: groupMembers,
      avatarColor: this.avatarService.getColor(),
    });
    this.pubSub.publish('modifiedPrivateGroup', { newPrivateGroup: { payload: newGroup, membersIds: [...new Set(membersIds)] } });
    return newGroup;
  }

  async editName(editNameInput: EditNameInput, userId: number): Promise<PrivateGroup> {
    const { groupId, name } = editNameInput;
    const membersIds = await this.canEdit(groupId, userId);
    const updatedGroup = await this.privateGroupsRepository.update(groupId, { name });
    this.pubSub.publish('modifiedPrivateGroup', {
      newPrivateGroup: { payload: updatedGroup, membersIds: membersIds.filter((id) => userId !== id) },
    });
    return updatedGroup;
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

    const updatedGroup = await this.privateGroupsRepository.update(groupId, {
      members: {
        createMany: { data: newGroupMembers },
      },
    });
    this.pubSub.publish('modifiedPrivateGroup', { newPrivateGroup: { payload: updatedGroup, membersIds: uniqueIds } });
    return updatedGroup;
  }

  async leave(groupId: number, userId: number): Promise<PrivateGroup> {
    try {
      const channel = await this.privateGroupsRepository.findById(groupId);
      if (!channel) throw new NotFoundException("Ce groupe privé n'existe pas");
      const { members, ...privateGroup } = channel;
      await this.privateGroupsRepository.deleteMember(groupId, userId);
      this.pubSub.publish('modifiedPrivateGroup', {
        newPrivateGroup: { payload: privateGroup, membersIds: members.map((member) => member.memberId).filter((memberId) => memberId !== userId) },
      });
      if (members.length - 1 === 0) await this.privateGroupsRepository.delete(groupId);
      return privateGroup;
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
