import { Field, ObjectType } from '@nestjs/graphql';
import { Message } from '../entities/message.entity';

@ObjectType()
export class MessagesResponse {
  @Field(() => Date, { nullable: true })
  cursor: Date | null;

  @Field(() => [Message])
  messages: Message[];
}
