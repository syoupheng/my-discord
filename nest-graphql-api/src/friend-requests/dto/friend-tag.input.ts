import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class FriendTag {
  @IsString()
  @IsNotEmpty()
  @Field()
  discriminator: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  username: string;
}
