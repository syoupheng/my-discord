/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AuthUser = BaseUser & {
  __typename?: 'AuthUser';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  friendRequests: Array<FriendRequest>;
  friends: Array<Friend>;
  id: Scalars['Int'];
  newMessagesNotifications: Array<Message>;
  phoneNumber?: Maybe<Scalars['String']>;
  privateConversations: Array<PrivateConversation>;
  privateGroups: Array<PrivateGroup>;
  status: UserStatus;
  username: Scalars['String'];
};

export type BaseMessage = {
  author: ChannelMember;
  content: Scalars['String'];
  id: Scalars['Int'];
  mentions: Array<ChannelMember>;
};

export type BaseUser = {
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  username: Scalars['String'];
};

export type ChannelMember = BaseUser & {
  __typename?: 'ChannelMember';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  username: Scalars['String'];
};

export type EditNameInput = {
  groupId: Scalars['Int'];
  name: Scalars['String'];
};

export type EditProfileInput = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<UserStatus>;
  username?: InputMaybe<Scalars['String']>;
};

export type Friend = BaseUser & {
  __typename?: 'Friend';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  status: UserStatus;
  username: Scalars['String'];
};

export type FriendRequest = BaseUser & {
  __typename?: 'FriendRequest';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  requestStatus: FriendRequestStatus;
  username: Scalars['String'];
};

export type FriendRequestConfirmedPayload = {
  __typename?: 'FriendRequestConfirmedPayload';
  newConversation: PrivateConversation;
  newFriend: Friend;
};

export enum FriendRequestStatus {
  Received = 'RECEIVED',
  Sent = 'SENT'
}

export type FriendTag = {
  id: Scalars['Int'];
  username: Scalars['String'];
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Message = BaseMessage & {
  __typename?: 'Message';
  author: ChannelMember;
  channelId: Scalars['Int'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  editedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  mentions: Array<ChannelMember>;
  referencedMessage?: Maybe<ReferencedMessage>;
  type: MessageType;
};

export enum MessageType {
  ArrivalNotification = 'ARRIVAL_NOTIFICATION',
  LeaveNotification = 'LEAVE_NOTIFICATION',
  NameChangeNotification = 'NAME_CHANGE_NOTIFICATION',
  Normal = 'NORMAL'
}

export type MessagesResponse = {
  __typename?: 'MessagesResponse';
  cursor?: Maybe<Scalars['DateTime']>;
  messages: Array<Message>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFriend: Friend;
  addGroupMembers: PrivateGroup;
  createGroup: PrivateGroup;
  deleteFriend: SuccessResponse;
  deleteFriendRequest: SuccessResponse;
  deleteMessage: SuccessResponse;
  editGroupName: PrivateGroup;
  editProfile: AuthUser;
  hideConversation: PrivateConversation;
  ignoreFriendRequest: SuccessResponse;
  leaveGroup: PrivateGroup;
  login: AuthUser;
  logout: SuccessResponse;
  markMessagesAsRead: Scalars['String'];
  register: AuthUser;
  sendFriendRequest: FriendRequest;
  sendMessage: Message;
  showConversation: PrivateConversation;
  typingMessage: Scalars['String'];
};


export type MutationAddFriendArgs = {
  friendId: Scalars['Int'];
};


export type MutationAddGroupMembersArgs = {
  groupId: Scalars['Int'];
  membersIds: Array<Scalars['Int']>;
};


export type MutationCreateGroupArgs = {
  membersIds: Array<Scalars['Int']>;
};


export type MutationDeleteFriendArgs = {
  friendId: Scalars['Int'];
};


export type MutationDeleteFriendRequestArgs = {
  friendId: Scalars['Int'];
};


export type MutationDeleteMessageArgs = {
  messageId: Scalars['Int'];
};


export type MutationEditGroupNameArgs = {
  editNameInput: EditNameInput;
};


export type MutationEditProfileArgs = {
  editProfileInput: EditProfileInput;
};


export type MutationHideConversationArgs = {
  conversationId: Scalars['Int'];
};


export type MutationIgnoreFriendRequestArgs = {
  friendId: Scalars['Int'];
};


export type MutationLeaveGroupArgs = {
  groupId: Scalars['Int'];
};


export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationMarkMessagesAsReadArgs = {
  messagesIds: Array<Scalars['Int']>;
};


export type MutationRegisterArgs = {
  registerUserInput: RegisterUserInput;
};


export type MutationSendFriendRequestArgs = {
  friendTag: FriendTag;
};


export type MutationSendMessageArgs = {
  sendMessageInput: SendMessageInput;
};


export type MutationShowConversationArgs = {
  friendId: Scalars['Int'];
};


export type MutationTypingMessageArgs = {
  channelId: Scalars['Int'];
};

export type PrivateConversation = {
  __typename?: 'PrivateConversation';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  member: ChannelMember;
};

export type PrivateGroup = {
  __typename?: 'PrivateGroup';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  members: Array<ChannelMember>;
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getMessages: MessagesResponse;
  me: AuthUser;
};


export type QueryGetMessagesArgs = {
  channelId: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
};

export type ReferencedMessage = BaseMessage & {
  __typename?: 'ReferencedMessage';
  author: ChannelMember;
  content: Scalars['String'];
  id: Scalars['Int'];
  mentions: Array<ChannelMember>;
};

export type RegisterUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

export type SendMessageInput = {
  channelId: Scalars['Int'];
  content: Scalars['String'];
  respondsToId?: InputMaybe<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  friendDeleted: Scalars['Int'];
  friendProfileChanged: Friend;
  friendRequestConfirmed: FriendRequestConfirmedPayload;
  friendRequestDeleted: Scalars['Int'];
  friendRequestReceived: FriendRequest;
  messageDeleted: Message;
  messageReceived: Message;
  userTyping: TypingNotification;
};


export type SubscriptionFriendDeletedArgs = {
  userId: Scalars['Int'];
};


export type SubscriptionFriendProfileChangedArgs = {
  userId: Scalars['Int'];
};


export type SubscriptionFriendRequestConfirmedArgs = {
  userId: Scalars['Int'];
};


export type SubscriptionFriendRequestDeletedArgs = {
  userId: Scalars['Int'];
};


export type SubscriptionFriendRequestReceivedArgs = {
  userId: Scalars['Int'];
};


export type SubscriptionMessageDeletedArgs = {
  userId: Scalars['Int'];
};


export type SubscriptionMessageReceivedArgs = {
  userId: Scalars['Int'];
};


export type SubscriptionUserTypingArgs = {
  userTypingInput: UserTypingInput;
};

export type SuccessResponse = {
  __typename?: 'SuccessResponse';
  success: Scalars['Boolean'];
};

export type TypingNotification = {
  __typename?: 'TypingNotification';
  channelId: Scalars['Int'];
  userId: Scalars['Int'];
  username: Scalars['String'];
};

export enum UserStatus {
  DoNotDisturb = 'DO_NOT_DISTURB',
  Inactive = 'INACTIVE',
  Invisible = 'INVISIBLE',
  Online = 'ONLINE'
}

export type UserTypingInput = {
  channelId?: InputMaybe<Scalars['Int']>;
  userId: Scalars['Int'];
};

export type AuthUserFieldsFragment = { __typename?: 'AuthUser', id: number, username: string, createdAt: any, email: string, status: UserStatus, phoneNumber?: string | null, friends: Array<{ __typename?: 'Friend', id: number, username: string, status: UserStatus }>, friendRequests: Array<{ __typename?: 'FriendRequest', id: number, username: string, requestStatus: FriendRequestStatus }>, privateConversations: Array<{ __typename?: 'PrivateConversation', id: number, createdAt: any, member: { __typename?: 'ChannelMember', id: number, username: string } }>, privateGroups: Array<{ __typename?: 'PrivateGroup', id: number, createdAt: any, name: string, members: Array<{ __typename?: 'ChannelMember', id: number, username: string }> }>, newMessagesNotifications: Array<{ __typename?: 'Message', id: number, channelId: number, createdAt: any }> } & { ' $fragmentName'?: 'AuthUserFieldsFragment' };

export type ChannelMemberFieldsFragment = { __typename?: 'ChannelMember', id: number, username: string, createdAt: any } & { ' $fragmentName'?: 'ChannelMemberFieldsFragment' };

export type MessageInfoFragment = { __typename?: 'Message', id: number, type: MessageType, createdAt: any, editedAt?: any | null, content: string, channelId: number, author: (
    { __typename?: 'ChannelMember' }
    & { ' $fragmentRefs'?: { 'ChannelMemberFieldsFragment': ChannelMemberFieldsFragment } }
  ), referencedMessage?: { __typename?: 'ReferencedMessage', id: number, content: string, author: (
      { __typename?: 'ChannelMember' }
      & { ' $fragmentRefs'?: { 'ChannelMemberFieldsFragment': ChannelMemberFieldsFragment } }
    ), mentions: Array<(
      { __typename?: 'ChannelMember' }
      & { ' $fragmentRefs'?: { 'ChannelMemberFieldsFragment': ChannelMemberFieldsFragment } }
    )> } | null, mentions: Array<(
    { __typename?: 'ChannelMember' }
    & { ' $fragmentRefs'?: { 'ChannelMemberFieldsFragment': ChannelMemberFieldsFragment } }
  )> } & { ' $fragmentName'?: 'MessageInfoFragment' };

export type GetAuthUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthUserQuery = { __typename?: 'Query', me: (
    { __typename?: 'AuthUser' }
    & { ' $fragmentRefs'?: { 'AuthUserFieldsFragment': AuthUserFieldsFragment } }
  ) };

export type LoginUserMutationVariables = Exact<{
  input: LoginUserInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', login: (
    { __typename?: 'AuthUser' }
    & { ' $fragmentRefs'?: { 'AuthUserFieldsFragment': AuthUserFieldsFragment } }
  ) };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logout: { __typename?: 'SuccessResponse', success: boolean } };

export type RegisterUserMutationVariables = Exact<{
  input: RegisterUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', register: (
    { __typename?: 'AuthUser' }
    & { ' $fragmentRefs'?: { 'AuthUserFieldsFragment': AuthUserFieldsFragment } }
  ) };

export type GetMessagesQueryVariables = Exact<{
  channelId: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetMessagesQuery = { __typename?: 'Query', getMessages: { __typename?: 'MessagesResponse', cursor?: any | null, messages: Array<(
      { __typename?: 'Message' }
      & { ' $fragmentRefs'?: { 'MessageInfoFragment': MessageInfoFragment } }
    )> } };

export type DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['Int'];
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage: { __typename?: 'SuccessResponse', success: boolean } };

export type MarkMessagesAsReadMutationVariables = Exact<{
  messagesIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type MarkMessagesAsReadMutation = { __typename?: 'Mutation', markMessagesAsRead: string };

export type OnMessageDeletedSubscriptionVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type OnMessageDeletedSubscription = { __typename?: 'Subscription', messageDeleted: { __typename?: 'Message', id: number, channelId: number } };

export type OnMessageReceivedSubscriptionVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type OnMessageReceivedSubscription = { __typename?: 'Subscription', messageReceived: (
    { __typename?: 'Message' }
    & { ' $fragmentRefs'?: { 'MessageInfoFragment': MessageInfoFragment } }
  ) };

export type SendMessageMutationVariables = Exact<{
  input: SendMessageInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: (
    { __typename?: 'Message' }
    & { ' $fragmentRefs'?: { 'MessageInfoFragment': MessageInfoFragment } }
  ) };

export type SendTypingNotificationMutationVariables = Exact<{
  channelId: Scalars['Int'];
}>;


export type SendTypingNotificationMutation = { __typename?: 'Mutation', typingMessage: string };

export type OnUserTypingSubscriptionVariables = Exact<{
  input: UserTypingInput;
}>;


export type OnUserTypingSubscription = { __typename?: 'Subscription', userTyping: { __typename?: 'TypingNotification', userId: number, username: string, channelId: number } };

export type SendFriendRequestMutationVariables = Exact<{
  input: FriendTag;
}>;


export type SendFriendRequestMutation = { __typename?: 'Mutation', sendFriendRequest: { __typename?: 'FriendRequest', id: number, username: string, requestStatus: FriendRequestStatus } };

export type NewFriendRequestFragment = { __typename?: 'FriendRequest', id: number, username: string, requestStatus: FriendRequestStatus } & { ' $fragmentName'?: 'NewFriendRequestFragment' };

export type DeleteFriendRequestMutationVariables = Exact<{
  friendId: Scalars['Int'];
}>;


export type DeleteFriendRequestMutation = { __typename?: 'Mutation', deleteFriendRequest: { __typename?: 'SuccessResponse', success: boolean } };

export type OnFriendRequestDeletedSubscriptionVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type OnFriendRequestDeletedSubscription = { __typename?: 'Subscription', friendRequestDeleted: number };

export type FriendRequestsFragment = { __typename?: 'AuthUser', friendRequests: Array<{ __typename?: 'FriendRequest', id: number, username: string, requestStatus: FriendRequestStatus }> } & { ' $fragmentName'?: 'FriendRequestsFragment' };

export type IgnoreFriendRequestMutationVariables = Exact<{
  friendId: Scalars['Int'];
}>;


export type IgnoreFriendRequestMutation = { __typename?: 'Mutation', ignoreFriendRequest: { __typename?: 'SuccessResponse', success: boolean } };

export type OnFriendRequestReceivedSubscriptionVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type OnFriendRequestReceivedSubscription = { __typename?: 'Subscription', friendRequestReceived: { __typename?: 'FriendRequest', id: number, username: string, requestStatus: FriendRequestStatus } };

export type AddNewFriendMutationVariables = Exact<{
  friendId: Scalars['Int'];
}>;


export type AddNewFriendMutation = { __typename?: 'Mutation', addFriend: { __typename?: 'Friend', id: number, username: string, status: UserStatus } };

export type NewFriendFragment = { __typename?: 'Friend', id: number, username: string, status: UserStatus } & { ' $fragmentName'?: 'NewFriendFragment' };

export type DeleteFriendMutationVariables = Exact<{
  friendId: Scalars['Int'];
}>;


export type DeleteFriendMutation = { __typename?: 'Mutation', deleteFriend: { __typename?: 'SuccessResponse', success: boolean } };

export type OnFriendProfileChangedSubscriptionVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type OnFriendProfileChangedSubscription = { __typename?: 'Subscription', friendProfileChanged: { __typename?: 'Friend', id: number, username: string, status: UserStatus } };

export type OnFriendRequestConfirmedSubscriptionVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type OnFriendRequestConfirmedSubscription = { __typename?: 'Subscription', friendRequestConfirmed: { __typename?: 'FriendRequestConfirmedPayload', newFriend: { __typename?: 'Friend', id: number, username: string, status: UserStatus }, newConversation: { __typename?: 'PrivateConversation', id: number, createdAt: any, member: { __typename?: 'ChannelMember', id: number, username: string } } } };

export type OnFriendDeletedSubscriptionVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type OnFriendDeletedSubscription = { __typename?: 'Subscription', friendDeleted: number };

export type GetFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendsQuery = { __typename?: 'Query', me: { __typename?: 'AuthUser', friends: Array<{ __typename?: 'Friend', id: number, username: string, status: UserStatus }> } };

export type HideConversationMutationVariables = Exact<{
  conversationId: Scalars['Int'];
}>;


export type HideConversationMutation = { __typename?: 'Mutation', hideConversation: { __typename?: 'PrivateConversation', id: number } };

export type GetConversationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConversationsQuery = { __typename?: 'Query', me: { __typename?: 'AuthUser', privateConversations: Array<{ __typename?: 'PrivateConversation', id: number, createdAt: any, member: { __typename?: 'ChannelMember', id: number, username: string } }> } };

export type ShowConversationMutationVariables = Exact<{
  friendId: Scalars['Int'];
}>;


export type ShowConversationMutation = { __typename?: 'Mutation', showConversation: { __typename?: 'PrivateConversation', id: number, createdAt: any, member: { __typename?: 'ChannelMember', id: number, username: string } } };

export type NewConversationFragment = { __typename?: 'PrivateConversation', id: number, createdAt: any, member: { __typename?: 'ChannelMember', id: number, username: string } } & { ' $fragmentName'?: 'NewConversationFragment' };

export type AddGroupMembersMutationVariables = Exact<{
  groupId: Scalars['Int'];
  membersIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type AddGroupMembersMutation = { __typename?: 'Mutation', addGroupMembers: { __typename?: 'PrivateGroup', id: number, members: Array<{ __typename?: 'ChannelMember', id: number, username: string }> } };

export type CreateGroupMutationVariables = Exact<{
  membersIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'PrivateGroup', id: number, name: string, createdAt: any, members: Array<{ __typename?: 'ChannelMember', id: number, username: string }> } };

export type NewPrivateGroupFragment = { __typename?: 'PrivateGroup', id: number, name: string, createdAt: any, members: Array<{ __typename?: 'ChannelMember', id: number, username: string }> } & { ' $fragmentName'?: 'NewPrivateGroupFragment' };

export type EditGroupNameMutationVariables = Exact<{
  input: EditNameInput;
}>;


export type EditGroupNameMutation = { __typename?: 'Mutation', editGroupName: { __typename?: 'PrivateGroup', id: number, name: string } };

export type LeaveGroupMutationVariables = Exact<{
  groupId: Scalars['Int'];
}>;


export type LeaveGroupMutation = { __typename?: 'Mutation', leaveGroup: { __typename?: 'PrivateGroup', id: number } };

export type GetGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGroupsQuery = { __typename?: 'Query', me: { __typename?: 'AuthUser', privateGroups: Array<{ __typename?: 'PrivateGroup', id: number, createdAt: any, name: string, members: Array<{ __typename?: 'ChannelMember', id: number, username: string }> }> } };

export type EditProfileMutationVariables = Exact<{
  input: EditProfileInput;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'AuthUser', id: number, username: string, status: UserStatus, phoneNumber?: string | null, email: string } };

export const AuthUserFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthUserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"friends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"friendRequests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"requestStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"privateConversations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"privateGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"newMessagesNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<AuthUserFieldsFragment, unknown>;
export const ChannelMemberFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChannelMemberFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChannelMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<ChannelMemberFieldsFragment, unknown>;
export const MessageInfoFragmentDoc = {"kind":"Document", "definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"editedAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChannelMemberFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"referencedMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChannelMemberFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mentions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChannelMemberFields"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mentions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChannelMemberFields"}}]}}]}},...ChannelMemberFieldsFragmentDoc.definitions]} as unknown as DocumentNode<MessageInfoFragment, unknown>;
export const NewFriendRequestFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NewFriendRequest"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FriendRequest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"requestStatus"}}]}}]} as unknown as DocumentNode<NewFriendRequestFragment, unknown>;
export const FriendRequestsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"friendRequests"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"friendRequests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"requestStatus"}}]}}]}}]} as unknown as DocumentNode<FriendRequestsFragment, unknown>;
export const NewFriendFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NewFriend"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Friend"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<NewFriendFragment, unknown>;
export const NewConversationFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NewConversation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PrivateConversation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<NewConversationFragment, unknown>;
export const NewPrivateGroupFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NewPrivateGroup"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PrivateGroup"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<NewPrivateGroupFragment, unknown>;
export const GetAuthUserDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAuthUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthUserFields"}}]}}]}},...AuthUserFieldsFragmentDoc.definitions]} as unknown as DocumentNode<GetAuthUserQuery, GetAuthUserQueryVariables>;
export const LoginUserDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthUserFields"}}]}}]}},...AuthUserFieldsFragmentDoc.definitions]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logoutUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<LogoutUserMutation, LogoutUserMutationVariables>;
export const RegisterUserDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"registerUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthUserFields"}}]}}]}},...AuthUserFieldsFragmentDoc.definitions]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const GetMessagesDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageInfo"}}]}}]}}]}},...MessageInfoFragmentDoc.definitions]} as unknown as DocumentNode<GetMessagesQuery, GetMessagesQueryVariables>;
export const DeleteMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"messageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const MarkMessagesAsReadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"markMessagesAsRead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messagesIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markMessagesAsRead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"messagesIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messagesIds"}}}]}]}}]} as unknown as DocumentNode<MarkMessagesAsReadMutation, MarkMessagesAsReadMutationVariables>;
export const OnMessageDeletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnMessageDeleted"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageDeleted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"channelId"}}]}}]}}]} as unknown as DocumentNode<OnMessageDeletedSubscription, OnMessageDeletedSubscriptionVariables>;
export const OnMessageReceivedDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnMessageReceived"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageReceived"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageInfo"}}]}}]}},...MessageInfoFragmentDoc.definitions]} as unknown as DocumentNode<OnMessageReceivedSubscription, OnMessageReceivedSubscriptionVariables>;
export const SendMessageDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sendMessageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageInfo"}}]}}]}},...MessageInfoFragmentDoc.definitions]} as unknown as DocumentNode<SendMessageMutation, SendMessageMutationVariables>;
export const SendTypingNotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendTypingNotification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"typingMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}]}]}}]} as unknown as DocumentNode<SendTypingNotificationMutation, SendTypingNotificationMutationVariables>;
export const OnUserTypingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnUserTyping"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserTypingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userTyping"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userTypingInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"channelId"}}]}}]}}]} as unknown as DocumentNode<OnUserTypingSubscription, OnUserTypingSubscriptionVariables>;
export const SendFriendRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendFriendRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FriendTag"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendFriendRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"friendTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"requestStatus"}}]}}]}}]} as unknown as DocumentNode<SendFriendRequestMutation, SendFriendRequestMutationVariables>;
export const DeleteFriendRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteFriendRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"friendId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFriendRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"friendId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"friendId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteFriendRequestMutation, DeleteFriendRequestMutationVariables>;
export const OnFriendRequestDeletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnFriendRequestDeleted"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"friendRequestDeleted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<OnFriendRequestDeletedSubscription, OnFriendRequestDeletedSubscriptionVariables>;
export const IgnoreFriendRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ignoreFriendRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"friendId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ignoreFriendRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"friendId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"friendId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<IgnoreFriendRequestMutation, IgnoreFriendRequestMutationVariables>;
export const OnFriendRequestReceivedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnFriendRequestReceived"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"friendRequestReceived"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"requestStatus"}}]}}]}}]} as unknown as DocumentNode<OnFriendRequestReceivedSubscription, OnFriendRequestReceivedSubscriptionVariables>;
export const AddNewFriendDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addNewFriend"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"friendId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addFriend"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"friendId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"friendId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<AddNewFriendMutation, AddNewFriendMutationVariables>;
export const DeleteFriendDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteFriend"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"friendId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFriend"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"friendId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"friendId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteFriendMutation, DeleteFriendMutationVariables>;
export const OnFriendProfileChangedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnFriendProfileChanged"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"friendProfileChanged"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<OnFriendProfileChangedSubscription, OnFriendProfileChangedSubscriptionVariables>;
export const OnFriendRequestConfirmedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnFriendRequestConfirmed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"friendRequestConfirmed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newFriend"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"newConversation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<OnFriendRequestConfirmedSubscription, OnFriendRequestConfirmedSubscriptionVariables>;
export const OnFriendDeletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnFriendDeleted"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"friendDeleted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<OnFriendDeletedSubscription, OnFriendDeletedSubscriptionVariables>;
export const GetFriendsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFriends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"friends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<GetFriendsQuery, GetFriendsQueryVariables>;
export const HideConversationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"hideConversation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hideConversation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"conversationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<HideConversationMutation, HideConversationMutationVariables>;
export const GetConversationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetConversations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"privateConversations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetConversationsQuery, GetConversationsQueryVariables>;
export const ShowConversationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"showConversation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"friendId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"showConversation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"friendId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"friendId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<ShowConversationMutation, ShowConversationMutationVariables>;
export const AddGroupMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addGroupMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"membersIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addGroupMembers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"membersIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"membersIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<AddGroupMembersMutation, AddGroupMembersMutationVariables>;
export const CreateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"membersIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"membersIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"membersIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<CreateGroupMutation, CreateGroupMutationVariables>;
export const EditGroupNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editGroupName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditNameInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editGroupName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"editNameInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<EditGroupNameMutation, EditGroupNameMutationVariables>;
export const LeaveGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"leaveGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<LeaveGroupMutation, LeaveGroupMutationVariables>;
export const GetGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"privateGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetGroupsQuery, GetGroupsQueryVariables>;
export const EditProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"editProfileInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<EditProfileMutation, EditProfileMutationVariables>;