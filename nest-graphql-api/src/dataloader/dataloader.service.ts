import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { PrivateGroupsService } from '../private-groups/private-groups.service';
import { PrivateConversationsService } from '../private-conversations/private-conversations.service';
import { IDataLoaders } from './dataloader.interface';
import { MessagesService } from '../messages/messages.service';
import { ReferencedMessage } from 'src/messages/entities/referenced-message.entity';
import { ChannelMember } from 'src/users/entities/channel-member.entity';

@Injectable()
export class DataloaderService {
  constructor(
    private privateConversationsService: PrivateConversationsService,
    private privateGroupsService: PrivateGroupsService,
    private messagesService: MessagesService,
  ) {}

  getLoaders(): IDataLoaders {
    const conversationMembersLoader = this.createConversationMembersLoader();
    const groupMembersLoader = this.createGroupMembersLoader();
    const messageAuthorsLoader = this.createMessageAuthorLoader();
    const referencedMessagesLoader = this.createReferencedMessageLoader();
    const messageMentionsLoader = this.createMessageMentionsLoader();
    return { conversationMembersLoader, groupMembersLoader, messageAuthorsLoader, referencedMessagesLoader, messageMentionsLoader };
  }

  createConversationMembersLoader() {
    return new DataLoader<number, ChannelMember>((ids: readonly number[]) =>
      this.privateConversationsService.findConversationMembersByBatch(ids as number[]),
    );
  }

  createGroupMembersLoader() {
    return new DataLoader<number, ChannelMember[]>((ids: readonly number[]) => this.privateGroupsService.findGroupMembersByBatch(ids as number[]));
  }

  createMessageAuthorLoader() {
    return new DataLoader<number, ChannelMember>((ids: readonly number[]) => this.messagesService.findMessageAuthorsByBatch(ids as number[]));
  }

  createReferencedMessageLoader() {
    return new DataLoader<number, ReferencedMessage>((ids: readonly number[]) => this.messagesService.findReferencedMessagesByBatch(ids as number[]));
  }

  createMessageMentionsLoader() {
    return new DataLoader<number, ChannelMember[]>((ids: readonly number[]) => this.messagesService.findMentionsByBatch(ids as number[]));
  }
}
