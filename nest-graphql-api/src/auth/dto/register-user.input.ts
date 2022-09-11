import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

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
  @IsNotEmpty()
  @Field()
  password: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Field({ nullable: true })
  phoneNumber?: string;
}