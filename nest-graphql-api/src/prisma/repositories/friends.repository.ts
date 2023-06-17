import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

interface IFriendUniqueId {
  userId: number;
  friendId: number;
}

@Injectable()
export class FriendsRepository {
  constructor(private prisma: PrismaService) {}

  findFriendRelation(friend_id_1: number, friend_id_2: number) {
    return this.prisma.friendsWith.findFirst({
      where: {
        OR: [
          { isFriendsWithId: friend_id_1, hasFriendsId: friend_id_2 },
          { isFriendsWithId: friend_id_2, hasFriendsId: friend_id_1 },
        ],
      },
    });
  }

  findUsersFriendById({ userId, friendId }: IFriendUniqueId) {
    return this.prisma.friendsWith.findFirst({
      where: {
        OR: [
          { isFriendsWithId: friendId, hasFriendsId: userId },
          { isFriendsWithId: userId, hasFriendsId: friendId },
        ],
      },
      include: {
        isFriendsWith: {
          select: {
            id: true,
            username: true,
            discriminator: true,
            status: true,
            createdAt: true,
            avatarColor: true,
          },
        },
        hasFriends: {
          select: {
            id: true,
            username: true,
            discriminator: true,
            status: true,
            createdAt: true,
            avatarColor: true,
          },
        },
      },
    });
  }

  findAllFriends(userId: number) {
    return this.prisma.friendsWith.findMany({
      where: {
        OR: [{ isFriendsWithId: userId }, { hasFriendsId: userId }],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        hasFriends: {
          select: {
            id: true,
            username: true,
            discriminator: true,
            status: true,
            createdAt: true,
            avatarColor: true,
          },
        },
        isFriendsWith: {
          select: {
            id: true,
            username: true,
            discriminator: true,
            status: true,
            createdAt: true,
            avatarColor: true,
          },
        },
      },
    });
  }

  create({ userId, friendId }: IFriendUniqueId) {
    return this.prisma.friendsWith.create({
      data: { isFriendsWithId: friendId, hasFriendsId: userId },
    });
  }

  delete(friend_1_id: number, friend_2_id: number) {
    return this.prisma.friendsWith.deleteMany({
      where: {
        OR: [
          { isFriendsWithId: friend_1_id, hasFriendsId: friend_2_id },
          { isFriendsWithId: friend_2_id, hasFriendsId: friend_1_id },
        ],
      },
    });
  }
}
