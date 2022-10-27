import { BadRequestException, ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { User } from '../users/entities/user.entity';
import { PrismaService } from '../prisma/prisma.service';
import { FriendTag } from './dto/friend-tag.input';
import { FriendRequest } from './entities/friend-request.entity';
import { Prisma } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { FriendRequestStatus } from './enums/friend-request-status.enum';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class FriendRequestsService {
  constructor(private usersService: UsersService, private prisma: PrismaService, @Inject(PUB_SUB) private pubSub: PubSub) {}

  async create(friendTag: FriendTag, sender: User): Promise<FriendRequest> {
    const { id: recipientId, username: recipientName } = friendTag;
    const { id: senderId, username: senderName } = sender;
    const recipient = await this.usersService.findOneById(recipientId);
    if (recipient.username !== recipientName || senderId === recipientId) throw new NotFoundException('Tag incorrect !');
    if (await this.findOne({ senderId: recipientId, recipientId: senderId }))
      throw new BadRequestException("Cet utilisateur t'a déjà envoyé une demande !");
    if (
      await this.prisma.friendsWith.findFirst({
        where: {
          OR: [
            { isFriendsWithId: senderId, hasFriendsId: recipientId },
            { isFriendsWithId: recipientId, hasFriendsId: senderId },
          ],
        },
      })
    )
      throw new ForbiddenException('Tu es déjà ami(e) avec cet utilisateur !');
    try {
      await this.prisma.friendRequest.create({ data: { senderId, recipientId } });
      this.pubSub.publish('friendRequestReceived', {
        friendRequestReceived: {
          recipientId,
          id: senderId,
          username: senderName,
          requestStatus: FriendRequestStatus.RECEIVED,
        },
      });
      return {
        id: recipientId,
        username: recipientName,
        requestStatus: FriendRequestStatus.SENT,
      };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
        throw new ConflictException('Vous avez déjà envoyé une demande à cet utilisateur !');
      }
      throw err;
    }
  }

  async findAll(userId: number): Promise<FriendRequest[]> {
    const rawFriendRequests = await this.prisma.friendRequest.findMany({
      where: {
        OR: [{ senderId: userId }, { recipientId: userId }],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
          },
        },
        recipient: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    const friendRequests = rawFriendRequests.map((request) => {
      const { id, username } = request.sender.id === userId ? request.recipient : request.sender;
      return {
        id,
        username,
        requestStatus: request.sender.id === userId ? FriendRequestStatus.SENT : FriendRequestStatus.RECEIVED,
      };
    });

    return friendRequests;
  }

  findOne(uniqueInput: Prisma.FriendRequestSenderIdRecipientIdCompoundUniqueInput) {
    return this.prisma.friendRequest.findUnique({
      where: {
        senderId_recipientId: uniqueInput,
      },
    });
  }

  async delete(userId: number, friendId: number) {
    const friendRequest = await this.prisma.friendRequest.findFirst({
      where: {
        OR: [
          { senderId: userId, recipientId: friendId },
          { senderId: friendId, recipientId: userId },
        ],
      },
    });

    if (!friendRequest) throw new NotFoundException("Vous n'avez pas envoyé de demande d'ami à cet utilisateur !");
    const { senderId, recipientId } = friendRequest;
    await this.prisma.friendRequest.delete({
      where: {
        senderId_recipientId: { senderId, recipientId },
      },
    });

    if (userId === senderId) this.pubSub.publish('friendRequestDeleted', { friendRequestDeleted: { senderId, recipientId } });
  }
}
