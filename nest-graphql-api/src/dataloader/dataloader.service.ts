import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { ConversationMember } from 'src/private-conversations/entities/conversation-member.entity';
import { PrivateConversationsService } from '../private-conversations/private-conversations.service';
import { IDataLoaders } from './dataloader.interface';

@Injectable()
export class DataloaderService {
  constructor(private privateConversationsService: PrivateConversationsService) {}

  getLoaders(): IDataLoaders {
    const conversationMembersLoader = this.createConversationMembersLoader();
    return { conversationMembersLoader };
  }

  createConversationMembersLoader() {
    return new DataLoader<number, ConversationMember>((ids: readonly number[]) =>
      this.privateConversationsService.findConversationMembersByBatch(ids as number[]),
    );
  }
}
