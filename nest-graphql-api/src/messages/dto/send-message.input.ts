import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

@InputType()
export class SendMessageInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  @Field()
  content: string;

  @IsInt()
  @Field((type) => Int)
  channelId: number;

  @IsInt()
  @IsOptional()
  @Field((type) => Int, { nullable: true })
  respondsToId?: number;
}
