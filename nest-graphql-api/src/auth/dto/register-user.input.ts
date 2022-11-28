import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

@InputType()
export class RegisterUserInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Field()
  password: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Field({ nullable: true })
  phoneNumber?: string;
}