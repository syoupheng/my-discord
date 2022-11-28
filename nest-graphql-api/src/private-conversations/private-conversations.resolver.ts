import { UseGuards } from '@nestjs/common';
import { Parent, ResolveField, Resolver, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { IDataLoaders } from 'src/dataloader/dataloader.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ConversationMember } from './entities/conversation-member.entity';
import { PrivateConversation } from './entities/private-conversation.entity';
import { PrivateConversationsService } from './private-conversations.service';

@Resolver((of) => PrivateConversation)
export class PrivateConversationsResolver {
  constructor(private readonly privateConversationsService: PrivateConversationsService) {}

  @Mutation((returns) => PrivateConversation)
  @UseGuards(JwtAuthGuard)
  hideConversation(@Args('conversationId', { type: () => Int }) conversationId: number, @Context() ctx) {
    return this.privateConversationsService.hide(conversationId, ctx.req.user.id);
  }

  @Mutation((returns) => PrivateConversation)
  @UseGuards(JwtAuthGuard)
  showConversation(@Args('friendId', { type: () => Int }) friendId: number, @Context() ctx) {
    return this.privateConversationsService.show(friendId, ctx.req.user.id);
  }

  @ResolveField('member', (returns) => ConversationMember)
  getMember(@Parent() conversation: PrivateConversation, @Context('loaders') loaders: IDataLoaders) {
    const { memberId } = conversation;
    return loaders.conversationMembersLoader.load(memberId);
  }
}
