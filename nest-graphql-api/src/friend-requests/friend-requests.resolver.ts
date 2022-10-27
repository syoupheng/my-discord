import { Resolver, Mutation, Args, Context, Int, Subscription } from '@nestjs/graphql';
import { FriendRequestsService } from './friend-requests.service';
import { FriendRequest } from './entities/friend-request.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FriendTag } from './dto/friend-tag.input';
import { SuccessResponse } from '../auth/dto/success-response';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { PubSub } from 'graphql-subscriptions';

@Resolver(() => FriendRequest)
export class FriendRequestsResolver {
  constructor(private readonly friendRequestsService: FriendRequestsService, @Inject(PUB_SUB) private pubSub: PubSub) {}

  @Mutation((returns) => FriendRequest)
  @UseGuards(JwtAuthGuard)
  sendFriendRequest(@Args('friendTag') friendTag: FriendTag, @Context() ctx) {
    return this.friendRequestsService.create(friendTag, ctx.req.user);
  }

  @Mutation((returns) => SuccessResponse)
  @UseGuards(JwtAuthGuard)
  async deleteFriendRequest(@Args('friendId', { type: () => Int }) friendId: number, @Context() ctx) {
    await this.friendRequestsService.delete(ctx.req.user.id, friendId);
    return { success: true };
  }

  @Subscription((returns) => FriendRequest, {
    filter: (payload, variables) => payload.friendRequestReceived.recipientId === variables.userId,
    resolve: ({ friendRequestReceived }) => {
      const { recipientId, ...newFriendRequest } = friendRequestReceived;
      return newFriendRequest;
    },
  })
  friendRequestReceived(@Args('userId', { type: () => Int }) userId: number) {
    return this.pubSub.asyncIterator('friendRequestReceived');
  }

  @Subscription((returns) => Int, {
    filter: (payload, variables) => payload.friendRequestDeleted.recipientId === variables.userId,
    resolve: ({ friendRequestDeleted }) => {
      const { senderId } = friendRequestDeleted;
      return senderId;
    },
  })
  friendRequestDeleted(@Args('userId', { type: () => Int }) userId: number) {
    return this.pubSub.asyncIterator('friendRequestDeleted');
  }
}
