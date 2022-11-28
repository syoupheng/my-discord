import { registerEnumType } from '@nestjs/graphql';

export enum FriendRequestStatus {
  RECEIVED = 'RECEIVED',
  SENT = 'SENT',
}

registerEnumType(FriendRequestStatus, {
  name: 'FriendRequestStatus',
});
