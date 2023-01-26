import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';

@InputType()
export class UserTypingInput {
  @IsInt()
  @Field((type) => Int)
  userId: number;

  @IsInt()
  @IsOptional()
  @Field((type) => Int, { nullable: true })
  channelId?: number;
}
