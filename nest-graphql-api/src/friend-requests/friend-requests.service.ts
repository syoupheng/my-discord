import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { FriendsService } from '../friends/friends.service';
import { User } from '../users/entities/user.entity';
import { PrismaService } from '../prisma/prisma.service';
import { FriendTag } from './dto/friend-tag.input';
import { FriendRequest } from './entities/friend-request.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class FriendRequestsService {
  constructor(private friendsService: FriendsService, private prisma: PrismaService) {}

  async create(friendTag: FriendTag, sender: User): Promise<FriendRequest> {
    const { id: recipientId, username } = friendTag;
    const { id: senderId, username: senderName } = sender;
    const recipient = await this.friendsService.findById(recipientId);
    if (recipient.username !== username || senderId === recipientId)
      throw new NotFoundException('Tag incorrect !');
    if (await this.findOne({ senderId: recipientId, recipientId: senderId }))
      throw new BadRequestException("Cet utilisateur t'a déjà envoyé une demande !");
    // TODO : Checck if they are not already friends
    try {
      await this.prisma.friendRequest.create({ data: { senderId, recipientId } });
      return {
        recipient,
        sender: {
          id: senderId,
          username: senderName,
        },
      };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
        throw new ConflictException('Vous avez déjà envoyé une demande à cet utilisateur !');
      }
      throw err;
    }
  }

  async findAll(userId: number): Promise<FriendRequest[]> {
    const friendRequests = await this.prisma.friendRequest.findMany({
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

    return friendRequests;
  }

  findOne(uniqueInput: Prisma.FriendRequestSenderIdRecipientIdCompoundUniqueInput) {
    return this.prisma.friendRequest.findUnique({
      where: {
        senderId_recipientId: uniqueInput,
      },
    });
  }

  async delete(uniqueInput: Prisma.FriendRequestSenderIdRecipientIdCompoundUniqueInput) {
    if (!(await this.findOne(uniqueInput)))
      throw new NotFoundException("Cette demande d'ami n'existe pas !");
    return this.prisma.friendRequest.delete({
      where: {
        senderId_recipientId: uniqueInput,
      },
    });
  }
}
