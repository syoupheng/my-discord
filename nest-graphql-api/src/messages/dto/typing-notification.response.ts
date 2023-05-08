import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TypingNotification {
  @Field(() => Int)
  userId: number;

  @Field()
  username: string;

  @Field(() => Int)
  channelId: number;
}
