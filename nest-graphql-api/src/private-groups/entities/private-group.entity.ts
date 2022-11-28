import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ConversationMember } from '../../private-conversations/entities/conversation-member.entity';

@ObjectType()
export class PrivateGroup {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field((type) => [ConversationMember])
  members?: ConversationMember[];
}
