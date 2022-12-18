import { Module } from '@nestjs/common';
import { PrivateGroupsModule } from '../private-groups/private-groups.module';
import { PrivateConversationsModule } from '../private-conversations/private-conversations.module';
import { DataloaderService } from './dataloader.service';
import { MessagesModule } from '../messages/messages.module';

@Module({
  providers: [DataloaderService],
  imports: [PrivateConversationsModule, PrivateGroupsModule, MessagesModule],
  exports: [DataloaderService],
})
export class DataloaderModule {}
