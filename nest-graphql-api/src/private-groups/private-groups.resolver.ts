import { Args, Context, Int, Mutation, Parent, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { ChannelMember } from '../users/entities/channel-member.entity';
import { IDataLoaders } from '../dataloader/dataloader.interface';
import { EditNameInput } from './dto/edit-name.input';
import { PrivateGroup } from './entities/private-group.entity';
import { PrivateGroupsService } from './private-groups.service';
import { AuthUser } from '../auth/entities/auth-user.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { Inject } from '@nestjs/common';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { PubSub } from 'graphql-subscriptions';

@Resolver(() => PrivateGroup)
export class PrivateGroupsResolver {
  constructor(
    private readonly privateGroupsService: PrivateGroupsService,
    // @ts-expect-error need to upgrade nestjs ?
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {}

  @Mutation(() => PrivateGroup)
  createGroup(@Args('membersIds', { type: () => [Int] }) membersIds: number[], @CurrentUser() user: AuthUser): Promise<PrivateGroup> {
    return this.privateGroupsService.create(membersIds, user);
  }

  @Mutation(() => PrivateGroup)
  editGroupName(@Args('editNameInput') editNameInput: EditNameInput, @CurrentUser() user: AuthUser): Promise<PrivateGroup> {
    return this.privateGroupsService.editName(editNameInput, user.id);
  }

  @Mutation(() => PrivateGroup)
  addGroupMembers(
    @Args('groupId', { type: () => Int }) groupId: number,
    @Args('membersIds', { type: () => [Int] }) membersIds: number[],
    @CurrentUser() user: AuthUser,
  ): Promise<PrivateGroup> {
    return this.privateGroupsService.addMember(groupId, membersIds, user.id);
  }

  @Mutation(() => PrivateGroup)
  leaveGroup(@Args('groupId', { type: () => Int }) groupId: number, @CurrentUser() user: AuthUser): Promise<PrivateGroup> {
    return this.privateGroupsService.leave(groupId, user.id);
  }

  @ResolveField('members', () => [ChannelMember])
  getMembers(@Parent() privateGroup: PrivateGroup, @Context('loaders') loaders: IDataLoaders): Promise<ChannelMember[]> {
    return loaders.groupMembersLoader.load(privateGroup.id);
  }

  @Public()
  @Subscription(() => PrivateGroup, {
    filter: ({ newPrivateGroup }, variables) => newPrivateGroup.membersIds.includes(variables.userId),
    resolve: ({ newPrivateGroup }) => newPrivateGroup.payload,
  })
  modifiedPrivateGroup(@Args('userId', { type: () => Int }) userId: number) {
    return this.pubSub.asyncIterator('modifiedPrivateGroup');
  }
}
