import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MessageType as PrismaMessageType } from '@prisma/client';
import { ChannelMember } from '../../users/entities/channel-member.entity';
import { MessageType } from '../enums/message-type.enum';
import { BaseMessage } from '../interfaces/base-message.interface';
import { ReferencedMessage } from './referenced-message.entity';

@ObjectType({ implements: () => [BaseMessage] })
export class Message implements BaseMessage {
  id: number;

  @Field(() => MessageType)
  type: PrismaMessageType;

  @Field()
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  editedAt: Date | null;

  content: string;

  author?: ChannelMember;

  authorId: number;

  @Field(() => Int)
  channelId?: number;

  @Field(() => ReferencedMessage, { nullable: true })
  referencedMessage?: ReferencedMessage;

  respondsToId: number | null;

  mentions?: ChannelMember[];
}
