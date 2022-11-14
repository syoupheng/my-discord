import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { ConversationMember } from '../private-conversations/entities/conversation-member.entity';
import { PrivateGroupsService } from '../private-groups/private-groups.service';
import { PrivateConversationsService } from '../private-conversations/private-conversations.service';
import { IDataLoaders } from './dataloader.interface';

@Injectable()
export class DataloaderService {
  constructor(private privateConversationsService: PrivateConversationsService, private privateGroupsService: PrivateGroupsService) {}

  getLoaders(): IDataLoaders {
    const conversationMembersLoader = this.createConversationMembersLoader();
    const groupMembersLoader = this.createGroupMembersLoader();
    return { conversationMembersLoader, groupMembersLoader };
  }

  createConversationMembersLoader() {
    return new DataLoader<number, ConversationMember>((ids: readonly number[]) =>
      this.privateConversationsService.findConversationMembersByBatch(ids as number[]),
    );
  }

  createGroupMembersLoader() {
    return new DataLoader<number, ConversationMember[]>((ids: readonly number[]) =>
      this.privateGroupsService.findGroupMembersByBatch(ids as number[]),
    );
  }
}
