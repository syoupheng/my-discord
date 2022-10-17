import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class FriendTag {
  @IsInt()
  @IsNotEmpty()
  @Field((type) => Int)
  id: number;

  @IsString()
  @IsNotEmpty()
  @Field()
  username: string;
}
