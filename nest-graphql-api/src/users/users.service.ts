import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { EditProfileInput } from './dto/edit-profile.input';
import { User } from './entities/user.entity';
import { UserStatus } from './enums/user-status.enum';
import * as argon from 'argon2';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { PubSub } from 'graphql-subscriptions';
import { FriendsService } from '../friends/friends.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, @Inject(PUB_SUB) private pubSub: PubSub, private friendsService: FriendsService) {}

  async create(userCreateInput: Prisma.UserCreateInput): Promise<User> {
    try {
      const newUser = await this.prisma.user.create({
        data: userCreateInput,
      });
      const { password, status, ...result } = newUser;
      return { ...result, status: UserStatus[status] };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ConflictException("Ce nom d'utilisateur ou email existe déjà !");
        }
      }
      throw err;
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(({ password, status, ...rest }) => ({
      status: UserStatus[status],
      ...rest,
    }));
  }

  async findOneById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException("Cet utilisateur n'existe pas");
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new NotFoundException("Aucun utilisateur n'existe avec cet email");
    return user;
  }

  async edit(input: EditProfileInput, userId: number) {
    try {
      if ('password' in input) input.password = await argon.hash(input.password);
      const {
        status: prismaStatus,
        password,
        ...userData
      } = await this.prisma.user.update({
        where: { id: userId },
        data: input,
      });
      const editedProfile = { ...userData, status: UserStatus[prismaStatus] };
      const { id, username, status } = editedProfile;
      const friends = await this.friendsService.findAll(userId);
      this.pubSub.publish('friendProfileChanged', { friendProfileChanged: { id, username, status, friends } });
      return editedProfile;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') throw new NotFoundException("Cet utilisateur n'existe pas !");
        if (err.code === 'P2002') throw new ConflictException("Ce nom d'utilisateur ou email existe déjà !");
      }
      throw err;
    }
  }
}
