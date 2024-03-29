import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma, User as PrismaUser } from '@prisma/client';
import { EditProfileInput } from './dto/edit-profile.input';
import { UserStatus } from './enums/user-status.enum';
import * as argon from 'argon2';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { PubSub } from 'graphql-subscriptions';
import { FriendsService } from '../friends/friends.service';
import { UsersRepository } from '../prisma/repositories/users.repository';
import { AuthUser } from 'src/auth/entities/auth-user.entity';
import { PrismaService } from '../prisma/prisma.service';
import { PrivateConversationsRepository } from '../prisma/repositories/private-conversations.repository';
import { PrivateGroupsRepository } from '../prisma/repositories/private-groups.repository';
import { AvatarService } from '../avatar/avatar.service';
import { ChannelMember } from './entities/channel-member.entity';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private usersRepository: UsersRepository,
    // @ts-expect-error need to upgrade nestjs ?
    @Inject(PUB_SUB) private pubSub: PubSub,
    private friendsService: FriendsService,
    private privateConversationRepository: PrivateConversationsRepository,
    private privateGroupRepository: PrivateGroupsRepository,
    private avatarService: AvatarService,
  ) {}

  async create(userCreateInput: Omit<Prisma.UserCreateInput, 'discriminator'>): Promise<AuthUser> {
    const MAX_RETRIES = 10;
    let retries = 0;
    while (retries < MAX_RETRIES) {
      try {
        const newUser = await this.usersRepository.create({ ...userCreateInput, discriminator: this.generateDiscriminator() });
        const { password, status, ...result } = newUser;
        return { ...result, status: UserStatus[status] };
      } catch (err) {
        if (!(err instanceof PrismaClientKnownRequestError) || err.code !== 'P2002') throw err;
        const errorHasTargetFields = !!err.meta && 'target' in err.meta && Array.isArray(err.meta.target);
        if (!errorHasTargetFields) throw err;
        const errorFields = err.meta!.target as unknown[];
        if (errorFields.includes('email')) throw new ConflictException('Cet email est déjà pris !');
        if (errorFields.length === 2 && errorFields.includes('username') && errorFields.includes('discriminator')) {
          retries++;
          continue;
        }
        throw err;
      }
    }
    throw new InternalServerErrorException();
  }

  async findOneById(id: number) {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException("Cet utilisateur n'existe pas");
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new NotFoundException("Aucun utilisateur n'existe avec cet email");
    return user;
  }

  async edit(input: EditProfileInput, userId: number) {
    try {
      if ('password' in input && input.password) input.password = await argon.hash(input.password);
      const { status: prismaStatus, password, ...userData } = await this.usersRepository.update(userId, input);
      const editedProfile = { ...userData, status: UserStatus[prismaStatus] };
      const { id, username, status, discriminator } = editedProfile;
      const friends = await this.friendsService.findAll(userId);
      this.pubSub.publish('friendProfileChanged', { friendProfileChanged: { id, username, discriminator, status, friends } });
      return editedProfile;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') throw new NotFoundException("Cet utilisateur n'existe pas !");
        if (err.code === 'P2002') throw new ConflictException("Ce nom d'utilisateur ou email existe déjà !");
      }
      throw err;
    }
  }

  async initAccount(authUser: AuthUser) {
    const chatGptUsers = await this.prisma.user.findMany({
      where: {
        chatGptRole: {
          not: null,
        },
      },
    });
    if (chatGptUsers.length < 2) return;
    const futureFriends = chatGptUsers.slice(0, Math.floor(chatGptUsers.length / 2));
    if (futureFriends.length) {
      await this.prisma.friendsWith
        .createMany({
          data: futureFriends.map((user) => ({ hasFriendsId: authUser.id, isFriendsWithId: user.id })),
        })
        .catch((err) => console.error(err));
      const channelsToCreate = futureFriends.map((user) => this.privateConversationRepository.create(authUser.id, user.id));
      await Promise.allSettled(channelsToCreate);
    }

    const futureFriendRequests = chatGptUsers.slice(Math.floor(chatGptUsers.length / 2));
    if (futureFriendRequests.length) {
      await this.prisma.friendRequest
        .createMany({
          data: futureFriendRequests.map((user) => ({ senderId: user.id, recipientId: authUser.id })),
        })
        .catch((err) => console.error(err));
    }

    const NUM_GROUPS = 2;
    for (let i = 0; i < NUM_GROUPS; i++) {
      await this.initPrivateGroup(chatGptUsers, authUser);
    }
  }

  async initPrivateGroup(chatGptUsers: PrismaUser[], user: AuthUser) {
    const numMembers = Math.floor(Math.random() * Math.min(chatGptUsers.length, 7)) + 2;
    const remainingUsers = [...chatGptUsers];
    const selectedMembers: ChannelMember[] = [user];
    for (let i = 0; i < numMembers; i++) {
      const randomIndex = Math.floor(Math.random() * remainingUsers.length);
      const randomUser = remainingUsers.splice(randomIndex, 1)[0];
      if (randomUser) selectedMembers.push(randomUser);
    }
    await this.privateGroupRepository
      .create({
        name: selectedMembers.map((member) => member.username).join(', '),
        members: selectedMembers,
        avatarColor: this.avatarService.getColor(),
      })
      .catch((err) => console.error(err));
  }

  generateDiscriminator() {
    const DISCRIMINATOR_LENGTH = 4;
    const numbersArray: string[] = [];
    for (let i = 0; i < DISCRIMINATOR_LENGTH; i++) {
      numbersArray.push(String(Math.floor(Math.random() * 10)));
    }
    return numbersArray.join('');
  }
}
