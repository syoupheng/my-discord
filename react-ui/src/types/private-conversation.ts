import { Friend } from "./user";

export interface ConversationMember extends Pick<Friend, "id" | "username" | "avatarColor"> {}

export interface PrivateConversation {
  id: number;
  createdAt: string;
  member: ConversationMember;
  __typename: "PrivateConversation";
}
