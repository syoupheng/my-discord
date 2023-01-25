import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ChannelRepository } from '../../prisma/repositories/channel.repository';
import { MessagesService } from '../messages.service';

@Injectable()
export class ChannelMemberGuard implements CanActivate {
  constructor(private channelRepository: ChannelRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { channelId } = ctx.getArgs();
    const userId = ctx.getContext().req.user.id;
    const membersInChannels = await this.channelRepository.findMembersByChannelId(channelId);
    // ctx.setContext({ membersInChannels });
    return membersInChannels.some(({ memberId }) => memberId === userId);
  }
}
