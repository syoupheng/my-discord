import { Field, Int, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class BaseUser {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  createdAt: Date;

  @Field()
  avatarColor: string;

  @Field()
  discriminator: string;
}
