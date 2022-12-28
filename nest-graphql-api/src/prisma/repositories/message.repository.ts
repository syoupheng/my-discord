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
}

@Injectable()
export class MessageRepository {
  constructor(private prisma: PrismaService) {}

  findManyByIds(ids: number[]) {
    return this.prisma.message.findMany({ where: { id: { in: ids } } });
  }

  findMentionsByIds(ids: number[]) {
    return this.prisma.mentionsOnMessages.findMany({
      where: { messageId: { in: ids } },
      include: {
        mention: {
          select: { id: true, username: true, createdAt: true },
        },
      },
    });
  }

  findManyByChannelId(channelId: number, pagination: IPagination) {
    const params: Prisma.MessageFindManyArgs = {
      take: pagination.take,
      where: { channelId },
      orderBy: { createdAt: 'desc' },
    };

    if ('cursor' in pagination && pagination.cursor) {
      params.cursor = { createdAt: pagination.cursor };
      params.skip = 1;
    }

    return this.prisma.message.findMany(params);
  }

  create(payload: IMessageCreateInput) {
    const { content, authorId, channelId, type } = payload;
    const data: Prisma.MessageCreateInput = {
      content,
      type,
      channel: { connect: { id: channelId } },
      author: { connect: { id: authorId } },
    };

    if ('respondsToId' in payload) data.respondsTo = { connect: { id: payload.respondsToId } };
    if (payload.mentionsIds.length > 0) data.mentions = { createMany: { data: payload.mentionsIds.map((mentionId) => ({ mentionId })) } };

    return this.prisma.message.create({ data });
  }
}
