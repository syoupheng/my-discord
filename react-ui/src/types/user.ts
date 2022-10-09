import { RegisterInput } from "./auth";

export type UserStatus = "ONLINE" | "INACTIVE" | "DO_NOT_DISTURB" | "INVISIBLE";

export interface User extends Omit<RegisterInput, "password"> {
  id: number;
  status: UserStatus;
}
