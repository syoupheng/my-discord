import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ChannelRepository } from './repositories/channel.repository';
import { FriendRequestRepository } from './repositories/friend-requests.repository';
import { FriendsRepository } from './repositories/friends.repository';
import { MessageRepository } from './repositories/message.repository';
import { PrivateConversationsRepository } from './repositories/private-conversations.repository';
import { PrivateGroupsRepository } from './repositories/private-groups.repository';
import { UsersRepository } from './repositories/users.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    FriendRequestRepository,
    FriendsRepository,
    PrivateConversationsRepository,
    PrivateGroupsRepository,
    MessageRepository,
    ChannelRepository,
  ],
  exports: [
    PrismaService,
    UsersRepository,
    FriendRequestRepository,
    FriendsRepository,
    PrivateConversationsRepository,
    PrivateGroupsRepository,
    MessageRepository,
    ChannelRepository,
  ],
})
export class PrismaModule {}
