import { Module } from '@nestjs/common';
import { PrivateConversationsModule } from '../private-conversations/private-conversations.module';
import { DataloaderService } from './dataloader.service';

@Module({
  providers: [DataloaderService],
  imports: [PrivateConversationsModule],
  exports: [DataloaderService],
})
export class DataloaderModule {}
