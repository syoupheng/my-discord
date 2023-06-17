import { Resolver, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { FriendRequestsService } from './friend-requests.service';
import { FriendRequest } from './entities/friend-request.entity';
import { Inject } from '@nestjs/common';
import { FriendTag } from './dto/friend-tag.input';
import { SuccessResponse } from '../auth/dto/success-response';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { PubSub } from 'graphql-subscriptions';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthUser } from '../auth/entities/auth-user.entity';
import { Public } from '../auth/decorators/public.decorator';

@Resolver(() => FriendRequest)
export class FriendRequestsResolver {
  constructor(
    private readonly friendRequestsService: FriendRequestsService,
    // @ts-expect-error need to upgrade nestjs ?
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {}

  @Mutation(() => FriendRequest)
  sendFriendRequest(@Args('friendTag') friendTag: FriendTag, @CurrentUser() user: AuthUser): Promise<FriendRequest> {
    return this.friendRequestsService.create(friendTag, user);
  }

  @Mutation(() => SuccessResponse)
  async deleteFriendRequest(@Args('friendId', { type: () => Int }) friendId: number, @CurrentUser() user: AuthUser): Promise<SuccessResponse> {
    await this.friendRequestsService.delete(user.id, friendId);
    return { success: true };
  }

  @Mutation(() => SuccessResponse)
  async ignoreFriendRequest(@Args('friendId', { type: () => Int }) friendId: number, @CurrentUser() user: AuthUser): Promise<SuccessResponse> {
    await this.friendRequestsService.ignore(user.id, friendId);
    return { success: true };
  }

  @Public()
  @Subscription(() => FriendRequest, {
    filter: (payload, variables) => payload.friendRequestReceived.recipientId === variables.userId,
    resolve: ({ friendRequestReceived }) => {
      const { recipientId, ...newFriendRequest } = friendRequestReceived;
      return newFriendRequest;
    },
  })
  friendRequestReceived(@Args('userId', { type: () => Int }) userId: number) {
    return this.pubSub.asyncIterator('friendRequestReceived');
  }

  @Public()
  @Subscription(() => Int, {
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
