import { Field, Int, InterfaceType } from '@nestjs/graphql';
import { ChannelMember } from '../../users/entities/channel-member.entity';
import { Message } from '../entities/message.entity';
import { ReferencedMessage } from '../entities/referenced-message.entity';

@InterfaceType({
  resolveType(baseMessage) {
    return 'referencedMessage' in baseMessage ? Message : ReferencedMessage;
  },
})
export abstract class BaseMessage {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field(() => ChannelMember)
  author?: ChannelMember;

  authorId: number;

  @Field(() => [ChannelMember])
  mentions?: ChannelMember[];
}
