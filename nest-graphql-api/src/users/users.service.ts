import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { EditProfileInput } from './dto/edit-profile.input';
import { User } from './entities/user.entity';
import { UserStatus } from './enums/user-status.enum';
import * as argon from 'argon2';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { PubSub } from 'graphql-subscriptions';
import { FriendsService } from '../friends/friends.service';
import { UsersRepository } from '../prisma/repositories/users.repository';
import { AuthUser } from 'src/auth/entities/auth-user.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private usersRepository: UsersRepository,
    @Inject(PUB_SUB) private pubSub: PubSub,
    private friendsService: FriendsService,
  ) {}

  async create(userCreateInput: Prisma.UserCreateInput): Promise<AuthUser> {
    try {
      const newUser = await this.usersRepository.create(userCreateInput);
      const { password, status, ...result } = newUser;
      return { ...result, status: UserStatus[status] };
    } catch (err) {
      // if (err instanceof PrismaClientKnownRequestError) {
      //   if (err.code === 'P2002') {
      //     throw new ConflictException("Ce nom d'utilisateur ou email existe déjà !");
      //   }
      // }
      this.prisma.throwDBError(err, { message: "Ce nom d'utilisateur ou email existe déjà !", errorType: 'conflict' });
      throw err;
    }
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
      if ('password' in input) input.password = await argon.hash(input.password);
      const { status: prismaStatus, password, ...userData } = await this.usersRepository.update(userId, input);
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
