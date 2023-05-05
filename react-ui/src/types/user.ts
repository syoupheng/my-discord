import { RegisterInput } from "./auth";
import { PrivateConversation } from "./private-conversation";
import { PrivateGroup } from "./private-group";

export type UserStatus = "ONLINE" | "INACTIVE" | "DO_NOT_DISTURB" | "INVISIBLE";

export interface User extends Omit<RegisterInput, "password"> {
  id: number;
  createdAt: string;
  status: UserStatus;
  friends: Friend[];
  friendRequests: FriendRequest[];
  privateConversations: PrivateConversation[];
  privateGroups: PrivateGroup[];
  avatarColor: string;
}

export interface Friend extends Pick<User, "id" | "username" | "status" | "avatarColor"> {}

export type FriendRequestStatus = "SENT" | "RECEIVED";

export interface FriendRequest extends Omit<Friend, "status"> {
  requestStatus: FriendRequestStatus;
}
