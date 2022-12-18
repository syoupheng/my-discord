import { z } from "zod";
import { ConversationMember } from "./private-conversation";

export interface PrivateGroup {
  id: number;
  createdAt: string;
  name: string;
  members: ConversationMember[];
  __typename: "PrivateGroup";
}

export const editGroupNameInputSchema = z.object({
  groupId: z.number().int().positive(),
  name: z.string().min(1).max(25),
});

export type EditGroupNameInput = z.infer<typeof editGroupNameInputSchema>;
