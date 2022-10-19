import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsResolver } from './friends.resolver';
import { FriendRequestsModule } from '../friend-requests/friend-requests.module';

@Module({
  imports: [FriendRequestsModule],
  providers: [FriendsResolver, FriendsService],
  exports: [FriendsService],
})
export class FriendsModule {}
