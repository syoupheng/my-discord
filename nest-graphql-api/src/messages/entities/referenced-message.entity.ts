import { ObjectType } from '@nestjs/graphql';
import { ChannelMember } from '../../users/entities/channel-member.entity';
import { BaseMessage } from '../interfaces/base-message.interface';

@ObjectType({ implements: () => [BaseMessage] })
export class ReferencedMessage implements BaseMessage {
  id: number;

  content: string;

  author?: ChannelMember;

  authorId: number;

  mentions?: ChannelMember[];
}
