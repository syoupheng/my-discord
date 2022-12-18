import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageInterfaceResolver } from './base-message.resolver';
import { MessagesResolver } from './messages.resolver';

@Module({
  providers: [MessageInterfaceResolver, MessagesResolver, MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
