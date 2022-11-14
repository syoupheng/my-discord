import DataLoader from 'dataloader';
import { ConversationMember } from '../private-conversations/entities/conversation-member.entity';

export interface IDataLoaders {
  conversationMembersLoader: DataLoader<number, ConversationMember>;
  groupMembersLoader: DataLoader<number, ConversationMember[]>;
}
