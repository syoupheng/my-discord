import { Field, ObjectType } from '@nestjs/graphql';
import { Friend } from '../../friends/entities/friends.entity';
import { FriendRequest } from '../../friend-requests/entities/friend-request.entity';
import { PrivateConversation } from '../../private-conversations/entities/private-conversation.entity';
import { BaseUser } from '../../users/interfaces/base-user.interface';
import { UserStatus } from '../../users/enums/user-status.enum';
import { PrivateGroup } from '../../private-groups/entities/private-group.entity';
import { Message } from '../../messages/entities/message.entity';

@ObjectType({ implements: () => [BaseUser] })
export class AuthUser implements BaseUser {
  id: number;

  username: string;

  discriminator: string;

  createdAt: Date;

  avatarColor: string;

  @Field()
  email: string;

  @Field(() => UserStatus)
  status: UserStatus;

  @Field(() => String, { nullable: true })
  phoneNumber: string | null;

  @Field(() => [FriendRequest])
  friendRequests?: FriendRequest[];

  @Field(() => [Friend])
  friends?: Friend[];

  @Field(() => [PrivateConversation])
  privateConversations?: PrivateConversation[];

  @Field(() => [PrivateGroup])
  privateGroups?: PrivateGroup[];

  @Field(() => [Message])
  newMessagesNotifications?: Message[];
}
