import { BadRequestException, ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FriendTag } from './dto/friend-tag.input';
import { FriendRequest } from './entities/friend-request.entity';
import { FriendRequestStatus } from './enums/friend-request-status.enum';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { PubSub } from 'graphql-subscriptions';
import { FriendRequestRepository } from '../prisma/repositories/friend-requests.repository';
import { UsersRepository } from '../prisma/repositories/users.repository';
import { FriendsRepository } from '../prisma/repositories/friends.repository';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUser } from 'src/auth/entities/auth-user.entity';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class FriendRequestsService {
  constructor(
    private prisma: PrismaService,
    private usersRepository: UsersRepository,
    private friendRequestRepository: FriendRequestRepository,
    private friendsRepository: FriendsRepository,
    // @ts-expect-error need to upgrade nestjs ?
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {}

  async create(friendTag: FriendTag, sender: AuthUser): Promise<FriendRequest> {
    const { discriminator: recipientDiscriminator, username: recipientName } = friendTag;
    const { id: senderId, username: senderName } = sender;
    const recipient = await this.usersRepository.findByTag({ username: recipientName, discriminator: recipientDiscriminator });
    if (!recipient) throw new NotFoundException("Cet utilisateur n'existe pas !");
    if (senderId === recipient.id) throw new NotFoundException('Tag incorrect !');
    const existingFriendRequest = await this.friendRequestRepository.findOne({ senderId: recipient.id, recipientId: senderId });
    if (existingFriendRequest) throw new BadRequestException("Cet utilisateur t'a déjà envoyé une demande !");
    const isAlreadyFriend = await this.friendsRepository.findFriendRelation(senderId, recipient.id);
    if (isAlreadyFriend) throw new ForbiddenException('Tu es déjà ami(e) avec cet utilisateur !');
    try {
      await this.friendRequestRepository.create({ senderId, recipientId: recipient.id });
      this.pubSub.publish('friendRequestReceived', {
        friendRequestReceived: {
          recipientId: recipient.id,
          id: senderId,
          username: senderName,
          discriminator: recipient.discriminator,
          avatarColor: sender.avatarColor,
          requestStatus: FriendRequestStatus.RECEIVED,
        },
      });
      return {
        id: recipient.id,
        username: recipientName,
        discriminator: recipient.discriminator,
        avatarColor: recipient.avatarColor,
        createdAt: recipient.createdAt,
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
    const rawFriendRequests = await this.friendRequestRepository.findAllByUserId(userId);
    const friendRequests = rawFriendRequests.map((request) => {
      const isSender = request.sender.id === userId;
      const { id, username, createdAt, avatarColor, discriminator } = isSender ? request.recipient : request.sender;
      return {
        id,
        username,
        discriminator,
        createdAt,
        avatarColor,
        requestStatus: isSender ? FriendRequestStatus.SENT : FriendRequestStatus.RECEIVED,
      };
    });

    return friendRequests;
  }

  async delete(senderId: number, recipientId: number) {
    const friendRequest = await this.friendRequestRepository.findOne({ senderId, recipientId });
    if (!friendRequest) throw new NotFoundException("Aucune demande d'ami n'a été envoyée !");
    await this.friendRequestRepository.delete({ senderId, recipientId });
    if (!friendRequest.ignored) this.pubSub.publish('friendRequestDeleted', { friendRequestDeleted: { senderId, recipientId } });
  }

  async ignore(userId: number, friendId: number): Promise<number> {
    const friendRequest = await this.friendRequestRepository.findOne({ senderId: friendId, recipientId: userId });
    if (!friendRequest) throw new NotFoundException("Cet utilisateur ne vous a pas envoyé de demande d'ami !");
    const updatedFriendRequest = await this.friendRequestRepository.update({ senderId: friendId, recipientId: userId }, { ignored: true });
    return updatedFriendRequest.senderId;
  }
}
