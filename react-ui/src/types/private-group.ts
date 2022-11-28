import { ConversationMember } from "./private-conversation";

export interface PrivateGroup {
  id: number;
  createdAt: string;
  name: string;
  members: ConversationMember[];
}
