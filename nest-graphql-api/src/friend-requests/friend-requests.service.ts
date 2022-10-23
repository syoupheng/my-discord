import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { User } from '../users/entities/user.entity';
import { PrismaService } from '../prisma/prisma.service';
import { FriendTag } from './dto/friend-tag.input';
import { FriendRequest } from './entities/friend-request.entity';
import { Prisma } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { FriendRequestStatus } from './enums/friend-request-status.enum';

@Injectable()
export class FriendRequestsService {
  constructor(private usersService: UsersService, private prisma: PrismaService) {}

  async create(friendTag: FriendTag, sender: User): Promise<FriendRequest> {
    const { id: recipientId, username: recipientName } = friendTag;
    const { id: senderId } = sender;
    const recipient = await this.usersService.findOneById(recipientId);
    if (recipient.username !== recipientName || senderId === recipientId)
      throw new NotFoundException('Tag incorrect !');
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
        requestStatus:
          request.sender.id === userId ? FriendRequestStatus.SENT : FriendRequestStatus.RECEIVED,
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
    // if (!(await this.findOne(uniqueInput)))
    //   throw new NotFoundException("Cette demande d'ami n'existe pas !");
    return this.prisma.friendRequest.deleteMany({
      where: {
        OR: [
          { senderId: userId, recipientId: friendId },
          { senderId: friendId, recipientId: userId },
        ],
        // senderId_recipientId: uniqueInput,
      },
    });
  }
}
