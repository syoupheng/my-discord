import { Friend } from "./user";

export interface MessageRoom {
  id: number;
  name?: string;
  members: Friend[];
}
