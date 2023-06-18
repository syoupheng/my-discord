import { registerEnumType } from '@nestjs/graphql';

export enum MessageType {
  NORMAL = 'NORMAL',
  NAME_CHANGE_NOTIFICATION = 'NAME_CHANGE_NOTIFICATION',
  ARRIVAL_NOTIFICATION = 'ARRIVAL_NOTIFICATION',
  LEAVE_NOTIFICATION = 'LEAVE_NOTIFICATION',
}

registerEnumType(MessageType, {
  name: 'MessageType',
});
