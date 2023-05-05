import { ObjectType, Field } from '@nestjs/graphql';
import { BaseUser } from '../../users/interfaces/base-user.interface';
import { FriendRequestStatus } from '../enums/friend-request-status.enum';

@ObjectType({ implements: () => [BaseUser] })
export class FriendRequest implements BaseUser {
  id: number;

  username: string;

  createdAt: Date;

  avatarColor: string;

  @Field((type) => FriendRequestStatus)
  requestStatus: FriendRequestStatus;
}
