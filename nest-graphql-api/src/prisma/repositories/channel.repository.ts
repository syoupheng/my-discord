import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ChannelRepository {
  constructor(private prisma: PrismaService) {}

  findById(channelId: number) {
    return this.prisma.channel.findUnique({ where: { id: channelId } });
  }

  findMembersByChannelId(channelId: number) {
    return this.prisma.membersInChannels.findMany({
      where: {
        channelId,
      },
      include: {
        member: {
          select: { chatGptRole: true, username: true },
        },
      },
    });
  }

  findManyByMemberId(memberId: number) {
    return this.prisma.membersInChannels.findMany({ where: { memberId } });
  }
}
