import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { MessageType } from 'src/messages/enums/message-type.enum';
import { IPagination } from 'src/messages/interfaces/pagination.interface';
import { PrismaService } from '../prisma.service';

interface IMessageCreateInput {
  content: string;
  authorId: number;
  channelId: number;
  respondsToId?: number;
  mentionsIds: number[];
  type: MessageType;
  notifiedUsersIds: number[];
}

@Injectable()
export class MessageRepository {
  constructor(private prisma: PrismaService) {}

  findById(id: number) {
    return this.prisma.message.findUnique({ where: { id } });
  }

  findManyByIds(ids: number[]) {
    return this.prisma.message.findMany({ where: { id: { in: ids } } });
  }

  findMentionsByIds(ids: number[]) {
    return this.prisma.mentionsOnMessages.findMany({
      where: { messageId: { in: ids } },
      include: {
        mention: {
          select: { id: true, username: true, createdAt: true, avatarColor: true },
        },
      },
    });
  }

  findManyByChannelId(channelId: number, pagination: IPagination) {
    const params: Prisma.MessageFindManyArgs = {
      take: -pagination.take,
      where: { channelId },
      orderBy: { createdAt: 'asc' },
    };

    if ('cursor' in pagination && pagination.cursor) {
      params.cursor = { createdAt: pagination.cursor };
      params.skip = 1;
    }

    return this.prisma.message.findMany(params);
  }

  findUserMessagesNotifications(userId: number) {
    return this.prisma.newMessagesNotifications.findMany({
      where: { userId },
      include: {
        message: true,
      },
    });
  }

  create(payload: IMessageCreateInput) {
    const { content, authorId, channelId, type, notifiedUsersIds } = payload;
    const data: Prisma.MessageCreateInput = {
      content,
      type,
      channel: { connect: { id: channelId } },
      author: { connect: { id: authorId } },
      notifiedTo: {
        create: notifiedUsersIds.map((id) => ({ userId: id })),
      },
    };

    if ('respondsToId' in payload) data.respondsTo = { connect: { id: payload.respondsToId } };
    if (payload.mentionsIds.length > 0) data.mentions = { createMany: { data: payload.mentionsIds.map((mentionId) => ({ mentionId })) } };

    return this.prisma.message.create({ data });
  }

  delete(messageId: number) {
    return this.prisma.message.delete({ where: { id: messageId } });
  }

  deleteMessagesNotifications(messagesIds: number[], userId: number) {
    return this.prisma.newMessagesNotifications.deleteMany({
      where: {
        userId,
        messageId: { in: messagesIds },
      },
    });
  }
}
