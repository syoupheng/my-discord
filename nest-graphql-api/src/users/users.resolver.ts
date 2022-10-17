import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  // constructor(private readonly usersService: UsersService) {}
  // @Query(() => [User], { name: 'users' })
  // @UseGuards(JwtAuthGuard)
  // findAllUsers() {
  //   return this.usersService.findAll();
  // }
  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.findOneById(id);
  // }
}
