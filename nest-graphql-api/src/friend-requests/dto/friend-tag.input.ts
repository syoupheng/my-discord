import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class FriendTag {
  @IsInt()
  @IsNotEmpty()
  @Field(() => Int)
  id: number;

  @IsString()
  @IsNotEmpty()
  @Field()
  username: string;
}
