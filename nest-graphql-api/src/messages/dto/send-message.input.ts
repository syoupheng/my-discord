import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class SendMessageInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  @Field()
  content: string;
}
