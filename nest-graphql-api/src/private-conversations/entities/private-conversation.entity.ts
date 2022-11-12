import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ConversationMember } from './conversation-member.entity';

@ObjectType()
export class PrivateConversation {
  @Field((type) => Int)
  id: number;

  @Field((type) => ConversationMember)
  member?: ConversationMember;

  memberId?: number;
}
