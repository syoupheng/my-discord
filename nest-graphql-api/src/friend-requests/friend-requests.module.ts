import { Module } from '@nestjs/common';
import { FriendRequestsService } from './friend-requests.service';
import { FriendRequestsResolver } from './friend-requests.resolver';
import { UsersModule } from '../users/users.module';
import { FriendsModule } from '../friends/friends.module';

@Module({
  imports: [UsersModule],
  providers: [FriendRequestsResolver, FriendRequestsService],
  exports: [FriendRequestsService],
})
export class FriendRequestsModule {}
