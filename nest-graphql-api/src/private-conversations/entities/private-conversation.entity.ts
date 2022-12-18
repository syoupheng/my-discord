import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ChannelMember } from '../../users/entities/channel-member.entity';

@ObjectType()
export class PrivateConversation {
  @Field((type) => Int)
  id: number;

  @Field((type) => ChannelMember)
  member?: ChannelMember;

  memberId?: number;

  @Field()
  createdAt: Date;
}
