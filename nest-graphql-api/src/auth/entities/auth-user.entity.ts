import { Field, ObjectType } from '@nestjs/graphql';
import { Friend } from '../../friends/entities/friends.entity';
import { FriendRequest } from '../../friend-requests/entities/friend-request.entity';
import { PrivateConversation } from '../../private-conversations/entities/private-conversation.entity';
import { BaseUser } from '../../users/interfaces/base-user.interface';
import { UserStatus } from '../../users/enums/user-status.enum';
import { PrivateGroup } from '../../private-groups/entities/private-group.entity';

@ObjectType({ implements: () => [BaseUser] })
export class AuthUser implements BaseUser {
  id: number;

  username: string;

  createdAt: Date;

  @Field()
  email: string;

  @Field((type) => UserStatus)
  status: UserStatus;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field((type) => [FriendRequest])
  friendRequests?: FriendRequest[];

  @Field((type) => [Friend])
  friends?: Friend[];

  @Field((type) => [PrivateConversation])
  privateConversations?: PrivateConversation[];

  @Field((type) => [PrivateGroup])
  privateGroups?: PrivateGroup[];
}
