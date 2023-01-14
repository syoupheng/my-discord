import { Field, ObjectType } from '@nestjs/graphql';
import { Message } from '../entities/message.entity';

@ObjectType()
export class MessagesResponse {
  @Field({ nullable: true })
  cursor: Date | null;

  @Field((type) => [Message])
  messages: Message[];
}
