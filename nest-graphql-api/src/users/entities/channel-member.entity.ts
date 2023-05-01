import { Field, ObjectType } from '@nestjs/graphql';
import { BaseUser } from '../interfaces/base-user.interface';

@ObjectType({ implements: () => [BaseUser] })
export class ChannelMember implements BaseUser {
  id: number;

  username: string;

  createdAt: Date;

  @Field(() => String, { nullable: true })
  chatGptRole?: string;
}
