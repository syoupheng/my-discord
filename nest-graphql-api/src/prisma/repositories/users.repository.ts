import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  findById(userId: number) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  findManyByIds(ids: number[]) {
    return this.prisma.user.findMany({
      where: {
        id: { in: ids },
      },
      select: { id: true, username: true, createdAt: true, avatarColor: true },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  create(payload: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data: payload });
  }

  update(userId: number, payload: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id: userId },
      data: payload,
    });
  }
}
