import { Inject, UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { SuccessResponse } from '../auth/dto/success-response';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Friend } from './entities/friends.entity';
import { FriendsService } from './friends.service';

@Resolver(() => Friend)
export class FriendsResolver {
  constructor(private readonly friendsService: FriendsService, @Inject(PUB_SUB) private pubSub: PubSub) {}

  @Mutation((returns) => Friend)
  @UseGuards(JwtAuthGuard)
  async addFriend(@Args('friendId', { type: () => Int }) friendId: number, @Context() ctx) {
    const { id, username, status } = ctx.req.user as Friend;
    const newFriend = await this.friendsService.add(friendId, ctx.req.user.id);
    this.pubSub.publish('friendRequestConfirmed', { friendRequestConfirmed: { id, username, status, senderId: newFriend.id } });
    return newFriend;
  }

  @Mutation((returns) => SuccessResponse)
  @UseGuards(JwtAuthGuard)
  async deleteFriend(@Args('friendId', { type: () => Int }) friendId: number, @Context() ctx) {
    await this.friendsService.delete(friendId, ctx.req.user.id);
    return { success: true };
  }

  @Subscription((returns) => Friend, {
    filter: (payload, variables) => payload.friendRequestConfirmed.senderId === variables.userId,
    resolve: ({ friendRequestConfirmed }) => {
      const { senderId, ...newFriend } = friendRequestConfirmed;
      return newFriend;
    },
  })
  friendRequestConfirmed(@Args('userId', { type: () => Int }) userId: number) {
    return this.pubSub.asyncIterator('friendRequestConfirmed');
  }

  @Subscription((returns) => Int, {
    filter: (payload, variables) => payload.friendDeleted.userId === variables.userId,
    resolve: ({ friendDeleted }) => {
      const { friendToRemoveId } = friendDeleted;
      return friendToRemoveId;
    },
  })
  friendDeleted(@Args('userId', { type: () => Int }) userId: number) {
    return this.pubSub.asyncIterator('friendDeleted');
  }

  @Subscription((returns) => Friend, {
    filter: async (friendsService: FriendsService, payload, variables) => {
      const friends = await friendsService.findAll(payload.friendProfileChanged.id);
      return friends.some((friend) => friend.id === variables.userId);
    },
  })
  friendProfileChanged(@Args('userId', { type: () => Int }) userId: number) {
    return this.pubSub.asyncIterator('friendProfileChanged');
  }
}
