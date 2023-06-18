import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ChannelMember } from '../../users/entities/channel-member.entity';

@ObjectType()
export class PrivateGroup {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  name: string | null;

  @Field()
  createdAt: Date;

  @Field(() => [ChannelMember])
  members?: ChannelMember[];

  @Field()
  avatarColor: string;
}
