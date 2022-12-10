import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { FriendRequestRepository } from './repositories/friend-requests.repository';
import { FriendsRepository } from './repositories/friends.repository';
import { PrivateConversationsRepository } from './repositories/private-conversations.repository';
import { PrivateGroupsRepository } from './repositories/private-groups.repository';
import { UsersRepository } from './repositories/users.repository';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, FriendRequestRepository, FriendsRepository, PrivateConversationsRepository, PrivateGroupsRepository],
  exports: [PrismaService, UsersRepository, FriendRequestRepository, FriendsRepository, PrivateConversationsRepository, PrivateGroupsRepository],
})
export class PrismaModule {}
