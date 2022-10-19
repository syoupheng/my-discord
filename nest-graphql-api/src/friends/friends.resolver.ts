import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { SuccessResponse } from '../auth/dto/success-response';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Friend } from './entities/friends.entity';
import { FriendsService } from './friends.service';

@Resolver(() => Friend)
export class FriendsResolver {
  constructor(private readonly friendsService: FriendsService) {}

  @Mutation((returns) => Friend)
  @UseGuards(JwtAuthGuard)
  addFriend(@Args('friendId', { type: () => Int }) friendId: number, @Context() ctx) {
    return this.friendsService.add(friendId, ctx.req.user.id);
  }

  @Mutation((returns) => SuccessResponse)
  @UseGuards(JwtAuthGuard)
  async deleteFriend(@Args('friendId', { type: () => Int }) friendId: number, @Context() ctx) {
    await this.friendsService.delete(friendId, ctx.req.user.id);
    return { success: true };
  }
}
