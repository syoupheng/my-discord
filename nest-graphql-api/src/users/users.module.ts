import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { FriendsModule } from '../friends/friends.module';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [FriendsModule],
  exports: [UsersService],
})
export class UsersModule {}
