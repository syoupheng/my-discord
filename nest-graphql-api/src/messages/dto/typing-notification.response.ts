import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TypingNotification {
  @Field((type) => Int)
  userId: number;

  @Field()
  username: string;

  @Field((type) => Int)
  channelId: number;
}
