import DataLoader from 'dataloader';
import { ReferencedMessage } from 'src/messages/entities/referenced-message.entity';
import { ChannelMember } from 'src/users/entities/channel-member.entity';

export interface IDataLoaders {
  conversationMembersLoader: DataLoader<number, ChannelMember>;
  groupMembersLoader: DataLoader<number, ChannelMember[]>;
  messageAuthorsLoader: DataLoader<number, ChannelMember>;
  referencedMessagesLoader: DataLoader<number, ReferencedMessage>;
  messageMentionsLoader: DataLoader<number, ChannelMember[]>;
}
