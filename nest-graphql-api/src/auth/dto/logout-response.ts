import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LogoutResponse {
  @Field(type => Boolean)
  success: boolean
}