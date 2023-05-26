import { Args, Context, Int, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ChannelMember } from '../users/entities/channel-member.entity';
import { IDataLoaders } from '../dataloader/dataloader.interface';
import { EditNameInput } from './dto/edit-name.input';
import { PrivateGroup } from './entities/private-group.entity';
import { PrivateGroupsService } from './private-groups.service';
import { AuthUser } from '../auth/entities/auth-user.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => PrivateGroup)
export class PrivateGroupsResolver {
  constructor(private readonly privateGroupsService: PrivateGroupsService) {}

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
}
