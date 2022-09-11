import { registerEnumType } from "@nestjs/graphql";

export enum UserStatus {
  ONLINE = "ONLINE",
  INACTIVE = "INACTIVE",
  DO_NOT_DISTURB = "DO_NOT_DISTURB",
  INVISIBLE = "INVISIBLE"
}

registerEnumType(UserStatus, {
  name: 'UserStatus',
});
