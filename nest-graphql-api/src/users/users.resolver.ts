import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthUser } from '../auth/entities/auth-user.entity';
import { UsersService } from './users.service';
import { EditProfileInput } from './dto/edit-profile.input';

@Resolver(() => AuthUser)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation((returns) => AuthUser)
  @UseGuards(JwtAuthGuard)
  editProfile(@Args('editProfileInput') editProfileInput: EditProfileInput, @Context() ctx) {
    return this.usersService.edit(editProfileInput, ctx.req.user.id);
  }
}
