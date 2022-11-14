import { RegisterInput } from "./auth";
import { PrivateConversation } from "./private-conversation";
import { PrivateGroup } from "./private-group";

export type UserStatus = "ONLINE" | "INACTIVE" | "DO_NOT_DISTURB" | "INVISIBLE";

export interface User extends Omit<RegisterInput, "password"> {
  id: number;
  status: UserStatus;
  friends: Friend[];
  friendRequests: FriendRequest[];
  privateConversations: PrivateConversation[];
  privateGroups: PrivateGroup[];
}

export interface Friend extends Pick<User, "id" | "username" | "status"> {}

export type FriendRequestStatus = "SENT" | "RECEIVED";

export interface FriendRequest extends Omit<Friend, "status"> {
  requestStatus: FriendRequestStatus;
}
