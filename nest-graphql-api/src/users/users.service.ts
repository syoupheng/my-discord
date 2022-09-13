import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { RegisterUserInput } from 'src/auth/dto/register-user.input';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './entities/user.entity';
import { UserStatus } from './enums/user-status.enum';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(registerUserInput: RegisterUserInput): Promise<User> {
    try {
      const newUser = await this.prisma.user.create({
        data: registerUserInput,
      });
      const { password, status, ...result } = newUser;
      return { ...result, status: UserStatus[status] };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ConflictException(
            'This username or email already exists !',
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

    if (!user) throw new NotFoundException('User not found...');
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new NotFoundException('User not found...');
    return user;
  }
}
