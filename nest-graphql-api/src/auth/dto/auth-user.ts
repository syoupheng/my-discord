import { ObjectType, OmitType } from "@nestjs/graphql";
import { User } from "../../users/entities/user.entity";

@ObjectType()
export class AuthUser extends OmitType(User, ['password']) {}