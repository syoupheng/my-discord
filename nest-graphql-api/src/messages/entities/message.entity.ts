import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MessageAuthor } from './message-author.entity';

@ObjectType()
export class Message {
  @Field((type) => Int)
  id: number;

  @Field((type) => Int)
  type: number;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  editedAt?: Date;

  @Field()
  content: string;

  @Field((type) => MessageAuthor)
  author: MessageAuthor;

  @Field((type) => Int, { nullable: true })
  groupId?: number;

  @Field((type) => Int, { nullable: true })
  conversationId?: number;
}
