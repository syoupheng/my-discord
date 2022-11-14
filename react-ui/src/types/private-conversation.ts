import { Friend } from "./user";

export interface ConversationMember extends Pick<Friend, "id" | "username"> {}

export interface PrivateConversation {
  id: number;
  createdAt: string;
  member: ConversationMember;
}
