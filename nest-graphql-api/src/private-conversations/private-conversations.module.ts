import { Module } from '@nestjs/common';
import { PrivateConversationsService } from './private-conversations.service';
import { PrivateConversationsResolver } from './private-conversations.resolver';

@Module({
  providers: [PrivateConversationsResolver, PrivateConversationsService],
  exports: [PrivateConversationsService],
})
export class PrivateConversationsModule {}
