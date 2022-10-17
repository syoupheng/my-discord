import { ObjectType, Field } from '@nestjs/graphql';
import { Friend } from '../../friends/entities/friends.entity';
import { FriendRequestParticipant } from '../dto/friend-req-participant';

@ObjectType()
export class FriendRequest {
  @Field((type) => FriendRequestParticipant)
  sender: FriendRequestParticipant;

  @Field((type) => FriendRequestParticipant)
  recipient: FriendRequestParticipant;
}
