import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ChannelMember } from '../users/entities/channel-member.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IDataLoaders } from '../dataloader/dataloader.interface';
import { EditNameInput } from './dto/edit-name.input';
import { PrivateGroup } from './entities/private-group.entity';
import { PrivateGroupsService } from './private-groups.service';
import { GraphQLContextWithUser } from 'src/types';

@Resolver(() => PrivateGroup)
export class PrivateGroupsResolver {
  constructor(private readonly privateGroupsService: PrivateGroupsService) {}

  @Mutation(() => PrivateGroup)
  @UseGuards(JwtAuthGuard)
  createGroup(@Args('membersIds', { type: () => [Int] }) membersIds: number[], @Context() ctx: GraphQLContextWithUser): Promise<PrivateGroup> {
    return this.privateGroupsService.create(membersIds, ctx.req.user);
  }

  @Mutation(() => PrivateGroup)
  @UseGuards(JwtAuthGuard)
  editGroupName(@Args('editNameInput') editNameInput: EditNameInput, @Context() ctx: GraphQLContextWithUser): Promise<PrivateGroup> {
    return this.privateGroupsService.editName(editNameInput, ctx.req.user.id);
  }

  @Mutation(() => PrivateGroup)
  @UseGuards(JwtAuthGuard)
  addGroupMembers(
    @Args('groupId', { type: () => Int }) groupId: number,
    @Args('membersIds', { type: () => [Int] }) membersIds: number[],
    @Context() ctx: GraphQLContextWithUser,
  ): Promise<PrivateGroup> {
    return this.privateGroupsService.addMember(groupId, membersIds, ctx.req.user.id);
  }

  @Mutation(() => PrivateGroup)
  @UseGuards(JwtAuthGuard)
  leaveGroup(@Args('groupId', { type: () => Int }) groupId: number, @Context() ctx: GraphQLContextWithUser): Promise<PrivateGroup> {
    return this.privateGroupsService.leave(groupId, ctx.req.user.id);
  }

  @ResolveField('members', () => [ChannelMember])
  getMembers(@Parent() privateGroup: PrivateGroup, @Context('loaders') loaders: IDataLoaders): Promise<ChannelMember[]> {
    return loaders.groupMembersLoader.load(privateGroup.id);
  }
}
