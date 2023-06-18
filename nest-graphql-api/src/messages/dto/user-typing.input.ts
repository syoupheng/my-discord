import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';

@InputType()
export class UserTypingInput {
  @IsInt()
  @Field(() => Int)
  userId: number;

  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  channelId?: number;
}
