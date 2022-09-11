import { ObjectType, PickType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";

@ObjectType()
export class AuthUser extends PickType(User, ['id', 'username', 'email', 'status', 'phoneNumber']) {}