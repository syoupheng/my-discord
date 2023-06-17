import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ChannelMember } from '../../users/entities/channel-member.entity';

@ObjectType()
export class PrivateConversation {
  @Field(() => Int)
  id: number;

  @Field(() => ChannelMember)
  member?: ChannelMember;

  memberId: number;

  @Field()
  createdAt: Date;
}
