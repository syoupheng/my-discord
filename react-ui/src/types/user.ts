import { RegisterInput } from "./auth";

export type UserStatus = "ONLINE" | "INACTIVE" | "DO_NOT_DISTURB" | "INVISIBLE";

export interface User extends Omit<RegisterInput, "password"> {
  id: number;
  status: UserStatus;
  friends: Friend[];
  friendRequests: FriendRequest[];
}

export interface Friend extends Pick<User, "id" | "username" | "status"> {}

export type FriendRequestStatus = "SENT" | "RECEIVED";

export interface FriendRequest extends Omit<Friend, "status"> {
  requestStatus: FriendRequestStatus;
}
