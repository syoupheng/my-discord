import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ChannelMember } from '../../users/entities/channel-member.entity';
import { MessageType } from '../enums/message-type.enum';
import { BaseMessage } from '../interfaces/base-message.interface';
import { ReferencedMessage } from './referenced-message.entity';

@ObjectType({ implements: () => [BaseMessage] })
export class Message implements BaseMessage {
  id: number;

  @Field((type) => MessageType)
  type: MessageType;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  editedAt?: Date;

  content: string;

  author?: ChannelMember;

  authorId: number;

  @Field((type) => Int)
  channelId?: number;

  @Field((type) => ReferencedMessage, { nullable: true })
  referencedMessage?: ReferencedMessage;

  referencedMessageId?: number;

  mentions?: ChannelMember[];
}