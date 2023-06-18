import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Friend } from '../friends/entities/friends.entity';
import { FriendRequest } from '../friend-requests/entities/friend-request.entity';
import { FriendRequestsService } from '../friend-requests/friend-requests.service';
import { AuthService } from './auth.service';
import { AuthUser } from './entities/auth-user.entity';
import { LoginUserInput } from './dto/login-user.input';
import { SuccessResponse } from './dto/success-response';
import { RegisterUserInput } from './dto/register-user.input';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { FriendsService } from '../friends/friends.service';
import { PrivateConversation } from '../private-conversations/entities/private-conversation.entity';
import { PrivateConversationsService } from '../private-conversations/private-conversations.service';
import { PrivateGroup } from '../private-groups/entities/private-group.entity';
import { PrivateGroupsService } from '../private-groups/private-groups.service';
import { Message } from '../messages/entities/message.entity';
import { MessagesNotificationsService } from '../messages/messages-notifications.service';
import { GraphQLContext } from 'src/types';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';

@Resolver(() => AuthUser)
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private friendRequestsService: FriendRequestsService,
    private friendsService: FriendsService,
    private privateConversationsService: PrivateConversationsService,
    private privateGroupsService: PrivateGroupsService,
    private messagesNotificationsService: MessagesNotificationsService,
  ) {}

  @Mutation(() => AuthUser)
  @Public()
  @UseGuards(GqlAuthGuard)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() ctx: GraphQLContext & { user: AuthUser }): Promise<AuthUser> {
    const { user, token } = await this.authService.login(ctx.user);
    this.authService.generateCookie(ctx.req, token);
    return user;
  }

  @Mutation(() => AuthUser)
  @Public()
  async register(@Args('registerUserInput') registerUserInput: RegisterUserInput, @Context() ctx: GraphQLContext): Promise<AuthUser> {
    const { user, token } = await this.authService.register(registerUserInput);
    this.authService.generateCookie(ctx.req, token);
    return user;
  }

  @Mutation(() => SuccessResponse)
  @Public()
  logout(@Context() ctx: GraphQLContext): SuccessResponse {
    ctx.req.res?.clearCookie('access_token');
    return { success: true };
  }

  @Query(() => SuccessResponse)
  checkAuthCookie(): SuccessResponse {
    return { success: true };
  }

  @Query(() => AuthUser, { name: 'me' })
  getMe(@CurrentUser() user: AuthUser): AuthUser {
    return user;
  }

  @ResolveField('friendRequests', () => [FriendRequest])
  getFriendRequests(@Parent() authUser: AuthUser): Promise<FriendRequest[]> {
    return this.friendRequestsService.findAll(authUser.id);
  }

  @ResolveField('friends', () => [Friend])
  getFriends(@Parent() authUser: AuthUser): Promise<Friend[]> {
    return this.friendsService.findAll(authUser.id);
  }

  @ResolveField('privateConversations', () => [PrivateConversation])
  getPrivateConversations(@Parent() authUser: AuthUser): Promise<PrivateConversation[]> {
    return this.privateConversationsService.findAll(authUser.id);
  }

  @ResolveField('privateGroups', () => [PrivateGroup])
  getPrivateGroups(@Parent() authUser: AuthUser): Promise<PrivateGroup[]> {
    return this.privateGroupsService.findAll(authUser.id);
  }

  @ResolveField('newMessagesNotifications', () => [Message])
  getNewMessagesNotifications(@Parent() authUser: AuthUser): Promise<Message[]> {
    return this.messagesNotificationsService.findAll(authUser.id);
  }
}
