import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './entities/user.entity';
import { UserStatus } from './enums/user-status.enum';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

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
          throw new ConflictException(
            'Ce nom d\'utilisateur ou email existe déjà !',
          );
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

    if (!user) throw new NotFoundException('Cet utilisateur n\'existe pas');
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new NotFoundException('Aucun utilisateur n\'existe avec cet email');
    return user;
  }
}
