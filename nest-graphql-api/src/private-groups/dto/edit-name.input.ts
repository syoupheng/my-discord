import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class EditNameInput {
  @IsInt()
  @Field(() => Int)
  groupId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Field()
  name: string;
}
