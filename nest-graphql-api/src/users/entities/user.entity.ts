import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserStatus } from '../enums/user-status.enum';

@ObjectType()
export class User {
  @Field(type => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field(type => UserStatus)
  status: UserStatus;

  password?: string;

  @Field({ nullable: true })
  phoneNumber?: string;
}
