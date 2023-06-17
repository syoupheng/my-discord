/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  fragment ChannelMember on ChannelMember {\n    id\n    username\n    discriminator\n    createdAt\n    avatarColor\n  }\n": types.ChannelMemberFragmentDoc,
    "\n  fragment Friend on Friend {\n    id\n    username\n    discriminator\n    status\n    avatarColor\n  }\n": types.FriendFragmentDoc,
    "\n  fragment FriendRequest on FriendRequest {\n    id\n    username\n    discriminator\n    requestStatus\n    avatarColor\n  }\n": types.FriendRequestFragmentDoc,
    "\n  fragment PrivateConversation on PrivateConversation {\n    id\n    createdAt\n    member {\n      ...ChannelMember\n    }\n  }\n": types.PrivateConversationFragmentDoc,
    "\n  fragment PrivateGroup on PrivateGroup {\n    id\n    createdAt\n    name\n    avatarColor\n    members {\n      ...ChannelMember\n    }\n  }\n": types.PrivateGroupFragmentDoc,
    "\n  fragment MessageNotification on Message {\n    id\n    channelId\n    createdAt\n  }\n": types.MessageNotificationFragmentDoc,
    "\n  fragment AuthUserInfo on AuthUser {\n    id\n    username\n    discriminator\n    createdAt\n    status\n    phoneNumber\n    avatarColor\n  }\n": types.AuthUserInfoFragmentDoc,
    "\n  fragment AuthUser on AuthUser {\n    ...AuthUserInfo\n    friends {\n      ...Friend\n    }\n    friendRequests {\n      ...FriendRequest\n    }\n    privateConversations {\n      ...PrivateConversation\n    }\n    privateGroups {\n      ...PrivateGroup\n    }\n    newMessagesNotifications {\n      ...MessageNotification\n    }\n  }\n": types.AuthUserFragmentDoc,
    "\n  fragment Message on Message {\n    id\n    type\n    createdAt\n    editedAt\n    content\n    channelId\n    author {\n      ...ChannelMember\n    }\n    referencedMessage {\n      id\n      content\n      author {\n        ...ChannelMember\n      }\n      mentions {\n        ...ChannelMember\n      }\n    }\n    mentions {\n      ...ChannelMember\n    }\n  }\n": types.MessageFragmentDoc,
    "\n  query GetAuthUser {\n    me {\n      ...AuthUser\n    }\n  }\n": types.GetAuthUserDocument,
    "\n  query GetAuthUserInfo {\n    me {\n      ...AuthUserInfo\n    }\n  }\n": types.GetAuthUserInfoDocument,
    "\n  query IsUserAuthenticated {\n    checkAuthCookie {\n      success\n    }\n  }\n": types.IsUserAuthenticatedDocument,
    "\n  mutation LoginUser($input: LoginUserInput!) {\n    login(loginUserInput: $input) {\n      ...AuthUser\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation logoutUser {\n    logout {\n      success\n    }\n  }\n": types.LogoutUserDocument,
    "\n  mutation RegisterUser($input: RegisterUserInput!) {\n    register(registerUserInput: $input) {\n      ...AuthUser\n    }\n  }\n": types.RegisterUserDocument,
    "\n  query GetMessages($channelId: Int!, $cursor: String, $limit: Int) {\n    getMessages(channelId: $channelId, cursor: $cursor, limit: $limit) {\n      cursor\n      messages {\n        ...Message\n      }\n    }\n  }\n": types.GetMessagesDocument,
    "\n  mutation DeleteMessage($messageId: Int!) {\n    deleteMessage(messageId: $messageId) {\n      success\n    }\n  }\n": types.DeleteMessageDocument,
    "\n  mutation markMessagesAsRead($messagesIds: [Int!]!) {\n    markMessagesAsRead(messagesIds: $messagesIds)\n  }\n": types.MarkMessagesAsReadDocument,
    "\n  subscription OnMessageDeleted($userId: Int!) {\n    messageDeleted(userId: $userId) {\n      id\n      channelId\n    }\n  }\n": types.OnMessageDeletedDocument,
    "\n  query GetNotifications {\n    me {\n      newMessagesNotifications {\n        ...MessageNotification\n      }\n    }\n  }\n": types.GetNotificationsDocument,
    "\n  subscription OnMessageReceived($userId: Int!) {\n    messageReceived(userId: $userId) {\n      ...Message\n    }\n  }\n": types.OnMessageReceivedDocument,
    "\n  mutation sendMessage($input: SendMessageInput!) {\n    sendMessage(sendMessageInput: $input) {\n      ...Message\n    }\n  }\n": types.SendMessageDocument,
    "\n  mutation SendTypingNotification($channelId: Int!) {\n    typingMessage(channelId: $channelId)\n  }\n": types.SendTypingNotificationDocument,
    "\n  subscription OnUserTyping($input: UserTypingInput!) {\n    userTyping(userTypingInput: $input) {\n      userId\n      username\n      channelId\n    }\n  }\n": types.OnUserTypingDocument,
    "\n  mutation sendFriendRequest($input: FriendTag!) {\n    sendFriendRequest(friendTag: $input) {\n      ...FriendRequest\n    }\n  }\n": types.SendFriendRequestDocument,
    "\n  mutation deleteFriendRequest($friendId: Int!) {\n    deleteFriendRequest(friendId: $friendId) {\n      success\n    }\n  }\n": types.DeleteFriendRequestDocument,
    "\n  subscription OnFriendRequestDeleted($userId: Int!) {\n    friendRequestDeleted(userId: $userId)\n  }\n": types.OnFriendRequestDeletedDocument,
    "\n  query GetAuthUserFriendRequest {\n    me {\n      friendRequests {\n        ...FriendRequest\n      }\n    }\n  }\n": types.GetAuthUserFriendRequestDocument,
    "\n  mutation ignoreFriendRequest($friendId: Int!) {\n    ignoreFriendRequest(friendId: $friendId) {\n      success\n    }\n  }\n": types.IgnoreFriendRequestDocument,
    "\n  subscription OnFriendRequestReceived($userId: Int!) {\n    friendRequestReceived(userId: $userId) {\n      ...FriendRequest\n    }\n  }\n": types.OnFriendRequestReceivedDocument,
    "\n  mutation addNewFriend($friendId: Int!) {\n    addFriend(friendId: $friendId) {\n      ...Friend\n    }\n  }\n": types.AddNewFriendDocument,
    "\n  mutation deleteFriend($friendId: Int!) {\n    deleteFriend(friendId: $friendId) {\n      success\n    }\n  }\n": types.DeleteFriendDocument,
    "\n  subscription OnFriendProfileChanged($userId: Int!) {\n    friendProfileChanged(userId: $userId) {\n      id\n      username\n      status\n    }\n  }\n": types.OnFriendProfileChangedDocument,
    "\n  subscription OnFriendRequestConfirmed($userId: Int!) {\n    friendRequestConfirmed(userId: $userId) {\n      newFriend {\n        ...Friend\n      }\n      newConversation {\n        ...PrivateConversation\n      }\n    }\n  }\n": types.OnFriendRequestConfirmedDocument,
    "\n  subscription OnFriendDeleted($userId: Int!) {\n    friendDeleted(userId: $userId)\n  }\n": types.OnFriendDeletedDocument,
    "\n  query GetFriends {\n    me {\n      friends {\n        ...Friend\n      }\n    }\n  }\n": types.GetFriendsDocument,
    "\n  mutation hideConversation($conversationId: Int!) {\n    hideConversation(conversationId: $conversationId) {\n      id\n    }\n  }\n": types.HideConversationDocument,
    "\n  query GetConversations {\n    me {\n      privateConversations {\n        ...PrivateConversation\n      }\n    }\n  }\n": types.GetConversationsDocument,
    "\n  mutation showConversation($friendId: Int!) {\n    showConversation(friendId: $friendId) {\n      ...PrivateConversation\n    }\n  }\n": types.ShowConversationDocument,
    "\n                fragment NewConversation on PrivateConversation {\n                  id\n                  createdAt\n                  member {\n                    id\n                    username\n                  }\n                }\n              ": types.NewConversationFragmentDoc,
    "\n  mutation addGroupMembers($groupId: Int!, $membersIds: [Int!]!) {\n    addGroupMembers(groupId: $groupId, membersIds: $membersIds) {\n      id\n      members {\n        id\n        username\n      }\n    }\n  }\n": types.AddGroupMembersDocument,
    "\n  mutation createGroup($membersIds: [Int!]!) {\n    createGroup(membersIds: $membersIds) {\n      ...PrivateGroup\n    }\n  }\n": types.CreateGroupDocument,
    "\n  mutation editGroupName($input: EditNameInput!) {\n    editGroupName(editNameInput: $input) {\n      id\n      name\n    }\n  }\n": types.EditGroupNameDocument,
    "\n  mutation leaveGroup($groupId: Int!) {\n    leaveGroup(groupId: $groupId) {\n      id\n    }\n  }\n": types.LeaveGroupDocument,
    "\n  query GetGroups {\n    me {\n      privateGroups {\n        ...PrivateGroup\n      }\n    }\n  }\n": types.GetGroupsDocument,
    "\n  subscription onModifyPrivateGroup($userId: Int!) {\n    modifiedPrivateGroup(userId: $userId) {\n      ...PrivateGroup\n    }\n  }\n": types.OnModifyPrivateGroupDocument,
    "\n  mutation editProfile($input: EditProfileInput!) {\n    editProfile(editProfileInput: $input) {\n      id\n      username\n      status\n      phoneNumber\n    }\n  }\n": types.EditProfileDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ChannelMember on ChannelMember {\n    id\n    username\n    discriminator\n    createdAt\n    avatarColor\n  }\n"): (typeof documents)["\n  fragment ChannelMember on ChannelMember {\n    id\n    username\n    discriminator\n    createdAt\n    avatarColor\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Friend on Friend {\n    id\n    username\n    discriminator\n    status\n    avatarColor\n  }\n"): (typeof documents)["\n  fragment Friend on Friend {\n    id\n    username\n    discriminator\n    status\n    avatarColor\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FriendRequest on FriendRequest {\n    id\n    username\n    discriminator\n    requestStatus\n    avatarColor\n  }\n"): (typeof documents)["\n  fragment FriendRequest on FriendRequest {\n    id\n    username\n    discriminator\n    requestStatus\n    avatarColor\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PrivateConversation on PrivateConversation {\n    id\n    createdAt\n    member {\n      ...ChannelMember\n    }\n  }\n"): (typeof documents)["\n  fragment PrivateConversation on PrivateConversation {\n    id\n    createdAt\n    member {\n      ...ChannelMember\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PrivateGroup on PrivateGroup {\n    id\n    createdAt\n    name\n    avatarColor\n    members {\n      ...ChannelMember\n    }\n  }\n"): (typeof documents)["\n  fragment PrivateGroup on PrivateGroup {\n    id\n    createdAt\n    name\n    avatarColor\n    members {\n      ...ChannelMember\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MessageNotification on Message {\n    id\n    channelId\n    createdAt\n  }\n"): (typeof documents)["\n  fragment MessageNotification on Message {\n    id\n    channelId\n    createdAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AuthUserInfo on AuthUser {\n    id\n    username\n    discriminator\n    createdAt\n    status\n    phoneNumber\n    avatarColor\n  }\n"): (typeof documents)["\n  fragment AuthUserInfo on AuthUser {\n    id\n    username\n    discriminator\n    createdAt\n    status\n    phoneNumber\n    avatarColor\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AuthUser on AuthUser {\n    ...AuthUserInfo\n    friends {\n      ...Friend\n    }\n    friendRequests {\n      ...FriendRequest\n    }\n    privateConversations {\n      ...PrivateConversation\n    }\n    privateGroups {\n      ...PrivateGroup\n    }\n    newMessagesNotifications {\n      ...MessageNotification\n    }\n  }\n"): (typeof documents)["\n  fragment AuthUser on AuthUser {\n    ...AuthUserInfo\n    friends {\n      ...Friend\n    }\n    friendRequests {\n      ...FriendRequest\n    }\n    privateConversations {\n      ...PrivateConversation\n    }\n    privateGroups {\n      ...PrivateGroup\n    }\n    newMessagesNotifications {\n      ...MessageNotification\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Message on Message {\n    id\n    type\n    createdAt\n    editedAt\n    content\n    channelId\n    author {\n      ...ChannelMember\n    }\n    referencedMessage {\n      id\n      content\n      author {\n        ...ChannelMember\n      }\n      mentions {\n        ...ChannelMember\n      }\n    }\n    mentions {\n      ...ChannelMember\n    }\n  }\n"): (typeof documents)["\n  fragment Message on Message {\n    id\n    type\n    createdAt\n    editedAt\n    content\n    channelId\n    author {\n      ...ChannelMember\n    }\n    referencedMessage {\n      id\n      content\n      author {\n        ...ChannelMember\n      }\n      mentions {\n        ...ChannelMember\n      }\n    }\n    mentions {\n      ...ChannelMember\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAuthUser {\n    me {\n      ...AuthUser\n    }\n  }\n"): (typeof documents)["\n  query GetAuthUser {\n    me {\n      ...AuthUser\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAuthUserInfo {\n    me {\n      ...AuthUserInfo\n    }\n  }\n"): (typeof documents)["\n  query GetAuthUserInfo {\n    me {\n      ...AuthUserInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query IsUserAuthenticated {\n    checkAuthCookie {\n      success\n    }\n  }\n"): (typeof documents)["\n  query IsUserAuthenticated {\n    checkAuthCookie {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LoginUser($input: LoginUserInput!) {\n    login(loginUserInput: $input) {\n      ...AuthUser\n    }\n  }\n"): (typeof documents)["\n  mutation LoginUser($input: LoginUserInput!) {\n    login(loginUserInput: $input) {\n      ...AuthUser\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation logoutUser {\n    logout {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation logoutUser {\n    logout {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RegisterUser($input: RegisterUserInput!) {\n    register(registerUserInput: $input) {\n      ...AuthUser\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterUser($input: RegisterUserInput!) {\n    register(registerUserInput: $input) {\n      ...AuthUser\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMessages($channelId: Int!, $cursor: String, $limit: Int) {\n    getMessages(channelId: $channelId, cursor: $cursor, limit: $limit) {\n      cursor\n      messages {\n        ...Message\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMessages($channelId: Int!, $cursor: String, $limit: Int) {\n    getMessages(channelId: $channelId, cursor: $cursor, limit: $limit) {\n      cursor\n      messages {\n        ...Message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteMessage($messageId: Int!) {\n    deleteMessage(messageId: $messageId) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteMessage($messageId: Int!) {\n    deleteMessage(messageId: $messageId) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation markMessagesAsRead($messagesIds: [Int!]!) {\n    markMessagesAsRead(messagesIds: $messagesIds)\n  }\n"): (typeof documents)["\n  mutation markMessagesAsRead($messagesIds: [Int!]!) {\n    markMessagesAsRead(messagesIds: $messagesIds)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription OnMessageDeleted($userId: Int!) {\n    messageDeleted(userId: $userId) {\n      id\n      channelId\n    }\n  }\n"): (typeof documents)["\n  subscription OnMessageDeleted($userId: Int!) {\n    messageDeleted(userId: $userId) {\n      id\n      channelId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetNotifications {\n    me {\n      newMessagesNotifications {\n        ...MessageNotification\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetNotifications {\n    me {\n      newMessagesNotifications {\n        ...MessageNotification\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription OnMessageReceived($userId: Int!) {\n    messageReceived(userId: $userId) {\n      ...Message\n    }\n  }\n"): (typeof documents)["\n  subscription OnMessageReceived($userId: Int!) {\n    messageReceived(userId: $userId) {\n      ...Message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation sendMessage($input: SendMessageInput!) {\n    sendMessage(sendMessageInput: $input) {\n      ...Message\n    }\n  }\n"): (typeof documents)["\n  mutation sendMessage($input: SendMessageInput!) {\n    sendMessage(sendMessageInput: $input) {\n      ...Message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SendTypingNotification($channelId: Int!) {\n    typingMessage(channelId: $channelId)\n  }\n"): (typeof documents)["\n  mutation SendTypingNotification($channelId: Int!) {\n    typingMessage(channelId: $channelId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription OnUserTyping($input: UserTypingInput!) {\n    userTyping(userTypingInput: $input) {\n      userId\n      username\n      channelId\n    }\n  }\n"): (typeof documents)["\n  subscription OnUserTyping($input: UserTypingInput!) {\n    userTyping(userTypingInput: $input) {\n      userId\n      username\n      channelId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation sendFriendRequest($input: FriendTag!) {\n    sendFriendRequest(friendTag: $input) {\n      ...FriendRequest\n    }\n  }\n"): (typeof documents)["\n  mutation sendFriendRequest($input: FriendTag!) {\n    sendFriendRequest(friendTag: $input) {\n      ...FriendRequest\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteFriendRequest($friendId: Int!) {\n    deleteFriendRequest(friendId: $friendId) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation deleteFriendRequest($friendId: Int!) {\n    deleteFriendRequest(friendId: $friendId) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription OnFriendRequestDeleted($userId: Int!) {\n    friendRequestDeleted(userId: $userId)\n  }\n"): (typeof documents)["\n  subscription OnFriendRequestDeleted($userId: Int!) {\n    friendRequestDeleted(userId: $userId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAuthUserFriendRequest {\n    me {\n      friendRequests {\n        ...FriendRequest\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAuthUserFriendRequest {\n    me {\n      friendRequests {\n        ...FriendRequest\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ignoreFriendRequest($friendId: Int!) {\n    ignoreFriendRequest(friendId: $friendId) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation ignoreFriendRequest($friendId: Int!) {\n    ignoreFriendRequest(friendId: $friendId) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription OnFriendRequestReceived($userId: Int!) {\n    friendRequestReceived(userId: $userId) {\n      ...FriendRequest\n    }\n  }\n"): (typeof documents)["\n  subscription OnFriendRequestReceived($userId: Int!) {\n    friendRequestReceived(userId: $userId) {\n      ...FriendRequest\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addNewFriend($friendId: Int!) {\n    addFriend(friendId: $friendId) {\n      ...Friend\n    }\n  }\n"): (typeof documents)["\n  mutation addNewFriend($friendId: Int!) {\n    addFriend(friendId: $friendId) {\n      ...Friend\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteFriend($friendId: Int!) {\n    deleteFriend(friendId: $friendId) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation deleteFriend($friendId: Int!) {\n    deleteFriend(friendId: $friendId) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription OnFriendProfileChanged($userId: Int!) {\n    friendProfileChanged(userId: $userId) {\n      id\n      username\n      status\n    }\n  }\n"): (typeof documents)["\n  subscription OnFriendProfileChanged($userId: Int!) {\n    friendProfileChanged(userId: $userId) {\n      id\n      username\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription OnFriendRequestConfirmed($userId: Int!) {\n    friendRequestConfirmed(userId: $userId) {\n      newFriend {\n        ...Friend\n      }\n      newConversation {\n        ...PrivateConversation\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription OnFriendRequestConfirmed($userId: Int!) {\n    friendRequestConfirmed(userId: $userId) {\n      newFriend {\n        ...Friend\n      }\n      newConversation {\n        ...PrivateConversation\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription OnFriendDeleted($userId: Int!) {\n    friendDeleted(userId: $userId)\n  }\n"): (typeof documents)["\n  subscription OnFriendDeleted($userId: Int!) {\n    friendDeleted(userId: $userId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFriends {\n    me {\n      friends {\n        ...Friend\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFriends {\n    me {\n      friends {\n        ...Friend\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation hideConversation($conversationId: Int!) {\n    hideConversation(conversationId: $conversationId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation hideConversation($conversationId: Int!) {\n    hideConversation(conversationId: $conversationId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetConversations {\n    me {\n      privateConversations {\n        ...PrivateConversation\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetConversations {\n    me {\n      privateConversations {\n        ...PrivateConversation\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation showConversation($friendId: Int!) {\n    showConversation(friendId: $friendId) {\n      ...PrivateConversation\n    }\n  }\n"): (typeof documents)["\n  mutation showConversation($friendId: Int!) {\n    showConversation(friendId: $friendId) {\n      ...PrivateConversation\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n                fragment NewConversation on PrivateConversation {\n                  id\n                  createdAt\n                  member {\n                    id\n                    username\n                  }\n                }\n              "): (typeof documents)["\n                fragment NewConversation on PrivateConversation {\n                  id\n                  createdAt\n                  member {\n                    id\n                    username\n                  }\n                }\n              "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addGroupMembers($groupId: Int!, $membersIds: [Int!]!) {\n    addGroupMembers(groupId: $groupId, membersIds: $membersIds) {\n      id\n      members {\n        id\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation addGroupMembers($groupId: Int!, $membersIds: [Int!]!) {\n    addGroupMembers(groupId: $groupId, membersIds: $membersIds) {\n      id\n      members {\n        id\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createGroup($membersIds: [Int!]!) {\n    createGroup(membersIds: $membersIds) {\n      ...PrivateGroup\n    }\n  }\n"): (typeof documents)["\n  mutation createGroup($membersIds: [Int!]!) {\n    createGroup(membersIds: $membersIds) {\n      ...PrivateGroup\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation editGroupName($input: EditNameInput!) {\n    editGroupName(editNameInput: $input) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation editGroupName($input: EditNameInput!) {\n    editGroupName(editNameInput: $input) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation leaveGroup($groupId: Int!) {\n    leaveGroup(groupId: $groupId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation leaveGroup($groupId: Int!) {\n    leaveGroup(groupId: $groupId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetGroups {\n    me {\n      privateGroups {\n        ...PrivateGroup\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetGroups {\n    me {\n      privateGroups {\n        ...PrivateGroup\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription onModifyPrivateGroup($userId: Int!) {\n    modifiedPrivateGroup(userId: $userId) {\n      ...PrivateGroup\n    }\n  }\n"): (typeof documents)["\n  subscription onModifyPrivateGroup($userId: Int!) {\n    modifiedPrivateGroup(userId: $userId) {\n      ...PrivateGroup\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation editProfile($input: EditProfileInput!) {\n    editProfile(editProfileInput: $input) {\n      id\n      username\n      status\n      phoneNumber\n    }\n  }\n"): (typeof documents)["\n  mutation editProfile($input: EditProfileInput!) {\n    editProfile(editProfileInput: $input) {\n      id\n      username\n      status\n      phoneNumber\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;