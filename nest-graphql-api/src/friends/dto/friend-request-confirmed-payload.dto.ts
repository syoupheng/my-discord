import { Field, ObjectType } from '@nestjs/graphql';
import { PrivateConversation } from '../../private-conversations/entities/private-conversation.entity';
import { Friend } from '../entities/friends.entity';

@ObjectType()
export class FriendRequestConfirmedPayload {
  @Field((type) => Friend)
  newFriend: Friend;

  @Field(() => PrivateConversation)
  newConversation: PrivateConversation;
}
