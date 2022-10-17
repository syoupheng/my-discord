import { Resolver, Mutation, Args, Context, Int } from '@nestjs/graphql';
import { FriendRequestsService } from './friend-requests.service';
import { FriendRequest } from './entities/friend-request.entity';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FriendTag } from './dto/friend-tag.input';
import { LogoutResponse } from '../auth/dto/logout-response';

@Resolver(() => FriendRequest)
export class FriendRequestsResolver {
  constructor(private readonly friendRequestsService: FriendRequestsService) {}

  @Mutation((returns) => FriendRequest)
  @UseGuards(JwtAuthGuard)
  sendFriendRequest(@Args('friendTag') friendTag: FriendTag, @Context() ctx) {
    return this.friendRequestsService.create(friendTag, ctx.req.user);
  }

  @Mutation((returns) => LogoutResponse)
  @UseGuards(JwtAuthGuard)
  async deleteFriendRequest(
    @Args('senderId', { type: () => Int }) senderId: number,
    @Args('recipientId', { type: () => Int }) recipientId: number,
    @Context() ctx,
  ) {
    if (![senderId, recipientId].includes(ctx.req.user.id))
      throw new ForbiddenException("Vous ne pouvez pas supprimer cette demande d'ami !");
    await this.friendRequestsService.delete({ senderId, recipientId });
    return { success: true };
  }
}
