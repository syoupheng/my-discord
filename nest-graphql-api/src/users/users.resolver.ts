import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthUser } from '../auth/entities/auth-user.entity';
import { UsersService } from './users.service';
import { EditProfileInput } from './dto/edit-profile.input';
import { GraphQLContextWithUser } from 'src/types';

@Resolver(() => AuthUser)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => AuthUser)
  @UseGuards(JwtAuthGuard)
  editProfile(@Args('editProfileInput') editProfileInput: EditProfileInput, @Context() ctx: GraphQLContextWithUser): Promise<AuthUser> {
    return this.usersService.edit(editProfileInput, ctx.req.user.id);
  }
}
