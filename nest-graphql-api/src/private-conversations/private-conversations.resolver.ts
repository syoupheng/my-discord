import { UseGuards } from '@nestjs/common';
import { Parent, ResolveField, Resolver, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { IDataLoaders } from 'src/dataloader/dataloader.interface';
import { ChannelMember } from '../users/entities/channel-member.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrivateConversation } from './entities/private-conversation.entity';
import { PrivateConversationsService } from './private-conversations.service';
import { GraphQLContextWithUser } from 'src/types';

@Resolver(() => PrivateConversation)
export class PrivateConversationsResolver {
  constructor(private readonly privateConversationsService: PrivateConversationsService) {}

  @Mutation(() => PrivateConversation)
  @UseGuards(JwtAuthGuard)
  hideConversation(
    @Args('conversationId', { type: () => Int }) conversationId: number,
    @Context() ctx: GraphQLContextWithUser,
  ): Promise<PrivateConversation> {
    return this.privateConversationsService.hide(conversationId, ctx.req.user.id);
  }

  @Mutation(() => PrivateConversation)
  @UseGuards(JwtAuthGuard)
  showConversation(@Args('friendId', { type: () => Int }) friendId: number, @Context() ctx: GraphQLContextWithUser): Promise<PrivateConversation> {
    return this.privateConversationsService.show(friendId, ctx.req.user.id);
  }

  @ResolveField('member', () => ChannelMember)
  getMember(@Parent() conversation: PrivateConversation, @Context('loaders') loaders: IDataLoaders): Promise<ChannelMember> | null {
    if (!conversation.memberId) return null;
    return loaders.conversationMembersLoader.load(conversation.memberId);
  }
}
