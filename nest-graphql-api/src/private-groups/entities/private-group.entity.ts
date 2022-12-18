import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ChannelMember } from '../../users/entities/channel-member.entity';

@ObjectType()
export class PrivateGroup {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field((type) => [ChannelMember])
  members?: ChannelMember[];
}
