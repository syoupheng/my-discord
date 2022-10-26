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
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { FriendsService } from '../friends/friends.service';

@Resolver((of) => AuthUser)
export class AuthResolver {
  constructor(private authService: AuthService, private friendRequestsService: FriendRequestsService, private friendsService: FriendsService) {}

  @Mutation((returns) => AuthUser)
  @UseGuards(GqlAuthGuard)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() ctx): Promise<AuthUser> {
    const { user, token } = await this.authService.login(ctx.user);
    this.authService.generateCookie(ctx.req, token);
    return user;
  }

  @Mutation((returns) => AuthUser)
  async register(@Args('registerUserInput') registerUserInput: RegisterUserInput, @Context() ctx): Promise<AuthUser> {
    const { user, token } = await this.authService.register(registerUserInput);
    this.authService.generateCookie(ctx.req, token);
    return user;
  }

  @Mutation((returns) => SuccessResponse)
  logout(@Context() ctx) {
    ctx.req.res?.clearCookie('access_token');
    return { success: true };
  }

  @Query((returns) => AuthUser, { name: 'me' })
  @UseGuards(JwtAuthGuard)
  getMe(@Context() ctx): AuthUser {
    return ctx.req.user;
  }

  @ResolveField('friendRequests', (returns) => [FriendRequest])
  getFriendRequests(@Parent() authUser: AuthUser) {
    const { id: userId } = authUser;
    return this.friendRequestsService.findAll(userId);
  }

  @ResolveField('friends', (returns) => [Friend])
  getFriends(@Parent() authUser: AuthUser) {
    const { id: userId } = authUser;
    return this.friendsService.findAll(userId);
  }
}
