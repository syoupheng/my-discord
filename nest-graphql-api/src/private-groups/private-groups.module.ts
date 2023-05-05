import { Module } from '@nestjs/common';
import { PrivateGroupsService } from './private-groups.service';
import { PrivateGroupsResolver } from './private-groups.resolver';
import { FriendsModule } from '../friends/friends.module';
import { AvatarModule } from '../avatar/avatar.module';

@Module({
  providers: [PrivateGroupsResolver, PrivateGroupsService],
  imports: [FriendsModule, AvatarModule],
  exports: [PrivateGroupsService],
})
export class PrivateGroupsModule {}
