import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthUser } from '../auth/entities/auth-user.entity';
import { UsersService } from './users.service';
import { EditProfileInput } from './dto/edit-profile.input';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => AuthUser)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => AuthUser)
  editProfile(@Args('editProfileInput') editProfileInput: EditProfileInput, @CurrentUser() user: AuthUser): Promise<AuthUser> {
    return this.usersService.edit(editProfileInput, user.id);
  }
}
