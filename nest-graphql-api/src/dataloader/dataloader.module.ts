import { Module } from '@nestjs/common';
import { PrivateGroupsModule } from '../private-groups/private-groups.module';
import { PrivateConversationsModule } from '../private-conversations/private-conversations.module';
import { DataloaderService } from './dataloader.service';

@Module({
  providers: [DataloaderService],
  imports: [PrivateConversationsModule, PrivateGroupsModule],
  exports: [DataloaderService],
})
export class DataloaderModule {}
