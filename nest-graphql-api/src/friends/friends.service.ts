import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { PrismaService } from '../prisma/prisma.service';
import { UserStatus } from '../users/enums/user-status.enum';
import { Friend } from './entities/friends.entity';
import { User } from '../users/entities/user.entity';
import { FriendRequestRepository } from '../prisma/repositories/friend-requests.repository';
import { FriendsRepository } from '../prisma/repositories/friends.repository';
import { PrivateConversationsRepository } from '../prisma/repositories/private-conversations.repository';

@Injectable()
export class FriendsService {
  constructor(
    private friendsRepository: FriendsRepository,
    private friendRequestRepository: FriendRequestRepository,
    private privateConversationsRepository: PrivateConversationsRepository,
    private prisma: PrismaService,
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {}

  async findById(friendId: number, authUserId: number): Promise<Friend> {
    const friend = await this.friendsRepository.findUsersFriendById({ userId: authUserId, friendId });
    if (!friend) throw new NotFoundException("Vous n'êtes pas amis avec cet utilisateur !");
    const { isFriendsWith, hasFriends } = friend;
    const { id, username, status, createdAt, avatarColor } = friendId === isFriendsWith.id ? isFriendsWith : hasFriends;
    return { id, username, createdAt, avatarColor, status: UserStatus[status] };
  }

  async findAll(authUserId: number): Promise<Friend[]> {
    const rawFriends = await this.friendsRepository.findAllFriends(authUserId);
    const friends = rawFriends.map(({ hasFriends, isFriendsWith }) => {
      const { id, username, status, createdAt, avatarColor } = hasFriends.id === authUserId ? isFriendsWith : hasFriends;
      return { id, username, createdAt, avatarColor, status: UserStatus[status] };
    });
    return friends;
  }

  async add(friendId: number, authUser: User) {
    const { id: authUserId, username, status } = authUser;
    const uniqueInput = {
      senderId: friendId,
      recipientId: authUserId,
    };
    const friendRequest = await this.friendRequestRepository.findOne(uniqueInput);
    if (!friendRequest) throw new ForbiddenException("Cet utilisateur ne vous a pas envoyé de demande d'ami !");
    const deleteFriendRequest = this.friendRequestRepository.delete(uniqueInput);

    const addNewFriend = this.friendsRepository.create({ userId: authUserId, friendId });

    const conversation = await this.privateConversationsRepository.findByFriendIds(authUserId, friendId);

    const createPrivateConversation = this.privateConversationsRepository.create(authUserId, friendId);

    const handlePrivateConversation = conversation
      ? this.privateConversationsRepository.updateManyMembersInChannels({
          membersIds: [friendId, authUserId],
          channelId: conversation.id,
          payload: { hidden: false },
        })
      : createPrivateConversation;

    await this.prisma.$transaction([deleteFriendRequest, addNewFriend, handlePrivateConversation]);
    const newFriend = await this.findById(friendId, authUserId);
    const newConversation = conversation ?? (await this.privateConversationsRepository.findByFriendIds(authUserId, friendId));
    this.pubSub.publish('friendRequestConfirmed', {
      friendRequestConfirmed: {
        senderId: newFriend.id,
        newFriend: { id: authUserId, username, status },
        newConversation: { ...newConversation, memberId: authUserId },
      },
    });
    return newFriend;
  }

  async delete(friendId: number, authUserId: number) {
    await this.findById(friendId, authUserId);
    await this.friendsRepository.delete(authUserId, friendId);
    this.pubSub.publish('friendDeleted', { friendDeleted: { friendToRemoveId: authUserId, userId: friendId } });
  }
}
