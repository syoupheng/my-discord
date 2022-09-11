import { Field, ObjectType } from "@nestjs/graphql";
import { AuthUser } from "../../users/dto/auth-user";

@ObjectType()
export class LoginResponse {
  @Field(type => AuthUser)
  user: AuthUser
}