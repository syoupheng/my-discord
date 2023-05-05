import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { FriendsModule } from '../friends/friends.module';
import { AvatarModule } from '../avatar/avatar.module';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [FriendsModule, AvatarModule],
  exports: [UsersService],
})
export class UsersModule {}
