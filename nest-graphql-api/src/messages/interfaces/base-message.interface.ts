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
  @Field((type) => Int)
  id: number;

  @Field()
  content: string;

  @Field((type) => ChannelMember)
  author?: ChannelMember;

  authorId: number;

  @Field((type) => [ChannelMember])
  mentions?: ChannelMember[];
}
