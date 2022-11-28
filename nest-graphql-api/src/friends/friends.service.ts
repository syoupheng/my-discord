import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { FriendRequestsService } from '../friend-requests/friend-requests.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserStatus } from '../users/enums/user-status.enum';
import { Friend } from './entities/friends.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class FriendsService {
  constructor(private friendRequestsService: FriendRequestsService, private prisma: PrismaService, @Inject(PUB_SUB) private pubSub: PubSub) {}

  async findById(friendId: number, authUserId: number): Promise<Friend> {
    const friend = await this.prisma.friendsWith.findFirst({
      where: {
        OR: [
          { isFriendsWithId: friendId, hasFriendsId: authUserId },
          { isFriendsWithId: authUserId, hasFriendsId: friendId },
        ],
      },
      include: {
        isFriendsWith: {
          select: {
            id: true,
            username: true,
            status: true,
          },
        },
        hasFriends: {
          select: {
            id: true,
            username: true,
            status: true,
          },
        },
      },
    });

    if (!friend) throw new NotFoundException("Vous n'êtes pas amis avec cet utilisateur !");

    const { isFriendsWith, hasFriends } = friend;
    const { id, username, status } = friendId === isFriendsWith.id ? isFriendsWith : hasFriends;
    return { id, username, status: UserStatus[status] };
  }

  async findAll(authUserId: number): Promise<Friend[]> {
    const rawFriends = await this.prisma.friendsWith.findMany({
      where: {
        OR: [{ isFriendsWithId: authUserId }, { hasFriendsId: authUserId }],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        hasFriends: {
          select: {
            id: true,
            username: true,
            status: true,
          },
        },
        isFriendsWith: {
          select: {
            id: true,
            username: true,
            status: true,
          },
        },
      },
    });

    const friends = rawFriends.map(({ hasFriends, isFriendsWith }) => {
      const { id, username, status } = hasFriends.id === authUserId ? isFriendsWith : hasFriends;
      return { id, username, status: UserStatus[status] };
    });

    return friends;
  }

  async add(friendId: number, authUser: User) {
    const { id: authUserId, username, status } = authUser;
    const uniqueInput = {
      senderId: friendId,
      recipientId: authUserId,
    };
    const friendRequest = await this.friendRequestsService.findOne(uniqueInput);
    if (!friendRequest) throw new ForbiddenException("Cet utilisateur ne vous a pas envoyé de demande d'ami !");
    const deleteFriendRequest = this.prisma.friendRequest.delete({
      where: {
        senderId_recipientId: uniqueInput,
      },
    });

    const addNewFriend = this.prisma.friendsWith.create({
      data: { isFriendsWithId: friendId, hasFriendsId: authUserId },
    });

    const conversation = await this.prisma.privateConversation.findFirst({
      where: {
        OR: [
          { friend_1_id: friendId, friend_2_id: authUserId },
          { friend_1_id: authUserId, friend_2_id: friendId },
        ],
      },
    });

    const createPrivateConversation = this.prisma.privateConversation.create({
      data: { friend_1_id: friendId, friend_2_id: authUserId },
    });

    const handlePrivateConversation = conversation
      ? this.prisma.privateConversation.update({
          where: { friend_1_id_friend_2_id: { friend_1_id: conversation.friend_1_id, friend_2_id: conversation.friend_2_id } },
          data: { display1: true, display2: true },
        })
      : createPrivateConversation;

    await this.prisma.$transaction([deleteFriendRequest, addNewFriend, handlePrivateConversation]);
    const newFriend = await this.findById(friendId, authUserId);
    const newConversation =
      conversation ??
      (await this.prisma.privateConversation.findFirst({
        where: {
          OR: [
            { friend_1_id: friendId, friend_2_id: authUserId },
            { friend_1_id: authUserId, friend_2_id: friendId },
          ],
        },
      }));
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
    await this.prisma.friendsWith.deleteMany({
      where: {
        OR: [
          { isFriendsWithId: friendId, hasFriendsId: authUserId },
          { isFriendsWithId: authUserId, hasFriendsId: friendId },
        ],
      },
    });
    this.pubSub.publish('friendDeleted', { friendDeleted: { friendToRemoveId: authUserId, userId: friendId } });
  }
}
