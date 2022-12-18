import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ChannelRepository {
  constructor(private prisma: PrismaService) {}

  findMembersByChannelId(channelId: number) {
    return this.prisma.membersInChannels.findMany({
      where: {
        channelId,
      },
    });
  }
}
