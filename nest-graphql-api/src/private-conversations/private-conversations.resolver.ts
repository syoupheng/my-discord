import { Parent, ResolveField, Resolver, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { IDataLoaders } from 'src/dataloader/dataloader.interface';
import { ChannelMember } from '../users/entities/channel-member.entity';
import { PrivateConversation } from './entities/private-conversation.entity';
import { PrivateConversationsService } from './private-conversations.service';
import { AuthUser } from '../auth/entities/auth-user.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => PrivateConversation)
export class PrivateConversationsResolver {
  constructor(private readonly privateConversationsService: PrivateConversationsService) {}

  @Mutation(() => PrivateConversation)
  hideConversation(@Args('conversationId', { type: () => Int }) conversationId: number, @CurrentUser() user: AuthUser): Promise<PrivateConversation> {
    return this.privateConversationsService.hide(conversationId, user.id);
  }

  @Mutation(() => PrivateConversation)
  showConversation(@Args('friendId', { type: () => Int }) friendId: number, @CurrentUser() user: AuthUser): Promise<PrivateConversation> {
    return this.privateConversationsService.show(friendId, user.id);
  }

  @ResolveField('member', () => ChannelMember)
  getMember(@Parent() conversation: PrivateConversation, @Context('loaders') loaders: IDataLoaders): Promise<ChannelMember> | null {
    if (!conversation.memberId) return null;
    return loaders.conversationMembersLoader.load(conversation.memberId);
  }
}
