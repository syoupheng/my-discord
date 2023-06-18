import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { SuccessResponse } from '../auth/dto/success-response';
import { Friend } from './entities/friends.entity';
import { FriendsService } from './friends.service';
import { FriendRequestConfirmedPayload } from './dto/friend-request-confirmed-payload.dto';
import { AuthUser } from '../auth/entities/auth-user.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';

@Resolver(() => Friend)
export class FriendsResolver {
  constructor(
    private readonly friendsService: FriendsService,
    // @ts-expect-error need to upgrade nestjs ?
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {}

  @Mutation(() => Friend)
  async addFriend(@Args('friendId', { type: () => Int }) friendId: number, @CurrentUser() user: AuthUser) {
    const newFriend = await this.friendsService.add(friendId, user);
    return newFriend;
  }

  @Mutation(() => SuccessResponse)
  async deleteFriend(@Args('friendId', { type: () => Int }) friendId: number, @CurrentUser() user: AuthUser) {
    await this.friendsService.delete(friendId, user.id);
    return { success: true };
  }

  @Public()
  @Subscription(() => FriendRequestConfirmedPayload, {
    filter: (payload, variables) => payload.friendRequestConfirmed.senderId === variables.userId,
    resolve: ({ friendRequestConfirmed }) => {
      const { senderId, ...newFriend } = friendRequestConfirmed;
      return newFriend;
    },
  })
  friendRequestConfirmed(@Args('userId', { type: () => Int }) userId: number) {
    return this.pubSub.asyncIterator('friendRequestConfirmed');
  }

  @Public()
  @Subscription(() => Int, {
    filter: (payload, variables) => payload.friendDeleted.userId === variables.userId,
    resolve: ({ friendDeleted }) => {
      const { friendToRemoveId } = friendDeleted;
      return friendToRemoveId;
    },
  })
  friendDeleted(@Args('userId', { type: () => Int }) userId: number) {
    return this.pubSub.asyncIterator('friendDeleted');
  }

  @Public()
  @Subscription(() => Friend, {
    async filter(payload, variables) {
      return payload.friendProfileChanged.friends.some((friend: Friend) => friend.id === variables.userId);
    },
  })
  friendProfileChanged(@Args('userId', { type: () => Int }) userId: number) {
    return this.pubSub.asyncIterator('friendProfileChanged');
  }
}
