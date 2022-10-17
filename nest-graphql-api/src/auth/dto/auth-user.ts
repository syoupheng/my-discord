import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { FriendRequest } from '../../friend-requests/entities/friend-request.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class AuthUser extends OmitType(User, ['password']) {
  @Field((type) => [FriendRequest])
  friendRequests?: FriendRequest[];
}
