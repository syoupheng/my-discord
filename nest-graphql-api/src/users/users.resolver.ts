import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthUser } from '../auth/entities/auth-user.entity';
import { UsersService } from './users.service';
import { EditProfileInput } from './dto/edit-profile.input';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { PubSub } from 'graphql-subscriptions';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation((returns) => AuthUser)
  @UseGuards(JwtAuthGuard)
  editProfile(@Args('editProfileInput') editProfileInput: EditProfileInput, @Context() ctx) {
    return this.usersService.edit(editProfileInput, ctx.req.user.id);
  }
}
