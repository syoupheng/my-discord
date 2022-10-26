import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { FriendRequestsService } from '../friend-requests/friend-requests.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserStatus } from '../users/enums/user-status.enum';
import { Friend } from './entities/friends.entity';

@Injectable()
export class FriendsService {
  constructor(private friendRequestsService: FriendRequestsService, private prisma: PrismaService) {}

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

  async add(friendId: number, authUserId: number) {
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

    await this.prisma.$transaction([deleteFriendRequest, addNewFriend]);
    return this.findById(friendId, authUserId);
  }

  async delete(friendId: number, authUserId: number) {
    await this.findById(friendId, authUserId);
    return this.prisma.friendsWith.deleteMany({
      where: {
        OR: [
          { isFriendsWithId: friendId, hasFriendsId: authUserId },
          { isFriendsWithId: authUserId, hasFriendsId: friendId },
        ],
      },
    });
  }
}
