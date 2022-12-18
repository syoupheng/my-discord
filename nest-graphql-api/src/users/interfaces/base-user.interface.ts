import { Field, Int, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class BaseUser {
  @Field((type) => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  createdAt: Date;
}
