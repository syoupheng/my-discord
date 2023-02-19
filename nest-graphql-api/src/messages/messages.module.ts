import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageInterfaceResolver } from './base-message.resolver';
import { MessagesResolver } from './messages.resolver';
import { MessagesNotificationsService } from './messages-notifications.service';

@Module({
  providers: [MessageInterfaceResolver, MessagesResolver, MessagesService, MessagesNotificationsService],
  exports: [MessagesService, MessagesNotificationsService],
})
export class MessagesModule {}
