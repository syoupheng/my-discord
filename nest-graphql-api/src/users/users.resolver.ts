import { Resolver, Args, Mutation, Context, Subscription, Int } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthUser } from '../auth/entities/auth-user.entity';
import { UsersService } from './users.service';
import { EditProfileInput } from './dto/edit-profile.input';
import { Friend } from '../friends/entities/friends.entity';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { PubSub } from 'graphql-subscriptions';
import { FriendsService } from 'src/friends/friends.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService, @Inject(PUB_SUB) private pubSub: PubSub) {}

  @Mutation((returns) => AuthUser)
  @UseGuards(JwtAuthGuard)
  editProfile(@Args('editProfileInput') editProfileInput: EditProfileInput, @Context() ctx) {
    return this.usersService.edit(editProfileInput, ctx.req.user.id);
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
