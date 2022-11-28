import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { Friend } from '../../friends/entities/friends.entity';
import { FriendRequest } from '../../friend-requests/entities/friend-request.entity';
import { User } from '../../users/entities/user.entity';
import { PrivateConversation } from '../../private-conversations/entities/private-conversation.entity';

@ObjectType()
export class AuthUser extends OmitType(User, ['password']) {
  @Field((type) => [FriendRequest])
  friendRequests?: FriendRequest[];

  @Field((type) => [Friend])
  friends?: Friend[];

  @Field((type) => [PrivateConversation])
  privateConversations?: PrivateConversation[];
}
