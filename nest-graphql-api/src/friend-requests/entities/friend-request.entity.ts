import { ObjectType, Field, OmitType } from '@nestjs/graphql';
import { Friend } from '../../friends/entities/friends.entity';
import { FriendRequestStatus } from '../enums/friend-request-status.enum';

@ObjectType()
export class FriendRequest extends OmitType(Friend, ['status']) {
  @Field((type) => FriendRequestStatus)
  requestStatus: FriendRequestStatus;
}
