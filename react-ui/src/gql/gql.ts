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
    "\n  fragment AuthUserFields on AuthUser {\n    id\n    username\n    createdAt\n    email\n    status\n    phoneNumber\n    friends {\n      id\n      username\n      status\n    }\n    friendRequests {\n      id\n      username\n      requestStatus\n    }\n    privateConversations {\n      id\n      createdAt\n      member {\n        id\n        username\n      }\n    }\n    privateGroups {\n      id\n      createdAt\n      name\n      members {\n        id\n        username\n      }\n    }\n    newMessagesNotifications {\n      id\n      channelId\n      createdAt\n    }\n  }\n": types.AuthUserFieldsFragmentDoc,
    "\n  fragment ChannelMemberFields on ChannelMember {\n    id\n    username\n    createdAt\n  }\n": types.ChannelMemberFieldsFragmentDoc,
    "\n  fragment MessageInfo on Message {\n    id\n    type\n    createdAt\n    editedAt\n    content\n    channelId\n    author {\n      ...ChannelMemberFields\n    }\n    referencedMessage {\n      id\n      content\n      author {\n        ...ChannelMemberFields\n      }\n      mentions {\n        ...ChannelMemberFields\n      }\n    }\n    mentions {\n      ...ChannelMemberFields\n    }\n  }\n": types.MessageInfoFragmentDoc,
    "\n  \n  query GetAuthUser {\n    me {\n      ...AuthUserFields\n    }\n  }\n": types.GetAuthUserDocument,
    "\n  \n  mutation LoginUser($input: LoginUserInput!) {\n    login(loginUserInput: $input) {\n      ...AuthUserFields\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation logoutUser {\n    logout {\n      success\n    }\n  }\n": types.LogoutUserDocument,
    "\n  \n  mutation RegisterUser($input: RegisterUserInput!) {\n    register(registerUserInput: $input) {\n      ...AuthUserFields\n    }\n  }\n": types.RegisterUserDocument,
    "\n  query GetMessages($channelId: Int!, $cursor: String, $limit: Int) {\n    getMessages(channelId: $channelId, cursor: $cursor, limit: $limit) {\n      cursor\n      messages {\n        ...MessageInfo\n      }\n    }\n  }\n": types.GetMessagesDocument,
    "\n  mutation DeleteMessage($messageId: Int!) {\n    deleteMessage(messageId: $messageId) {\n      success\n    }\n  }\n": types.DeleteMessageDocument,
    "\n  mutation markMessagesAsRead($messagesIds: [Int!]!) {\n    markMessagesAsRead(messagesIds: $messagesIds)\n  }\n": types.MarkMessagesAsReadDocument,
    "\n  subscription OnMessageDeleted($userId: Int!) {\n    messageDeleted(userId: $userId) {\n      id\n      channelId\n    }\n  }\n": types.OnMessageDeletedDocument,
    "\n  subscription OnMessageReceived($userId: Int!) {\n    messageReceived(userId: $userId) {\n      ...MessageInfo\n    }\n  }\n": types.OnMessageReceivedDocument,
    "\n  mutation sendMessage($input: SendMessageInput!) {\n    sendMessage(sendMessageInput: $input) {\n      ...MessageInfo\n    }\n  }\n": types.SendMessageDocument,
    "\n  mutation SendTypingNotification($channelId: Int!) {\n    typingMessage(channelId: $channelId)\n  }\n": types.SendTypingNotificationDocument,
    "\n  subscription OnUserTyping($input: UserTypingInput!) {\n    userTyping(userTypingInput: $input) {\n      userId\n      username\n      channelId\n    }\n  }\n": types.OnUserTypingDocument,
    "\n  mutation sendFriendRequest($input: FriendTag!) {\n    sendFriendRequest(friendTag: $input) {\n      id\n      username\n      requestStatus\n    }\n  }\n": types.SendFriendRequestDocument,
    "\n                fragment NewFriendRequest on FriendRequest {\n                  id\n                  username\n                  requestStatus\n                }\n              ": types.NewFriendRequestFragmentDoc,
    "\n  mutation deleteFriendRequest($friendId: Int!) {\n    deleteFriendRequest(friendId: $friendId) {\n      success\n    }\n  }\n": types.DeleteFriendRequestDocument,
    "\n  subscription OnFriendRequestDeleted($userId: Int!) {\n    friendRequestDeleted(userId: $userId)\n  }\n": types.OnFriendRequestDeletedDocument,
    "\n      fragment friendRequests on AuthUser {\n        friendRequests {\n          id\n          username\n          requestStatus\n        }\n      }\n    ": types.FriendRequestsFragmentDoc,
    "\n  mutation ignoreFriendRequest($friendId: Int!) {\n    ignoreFriendRequest(friendId: $friendId) {\n      success\n    }\n  }\n": types.IgnoreFriendRequestDocument,
    "\n  subscription OnFriendRequestReceived($userId: Int!) {\n    friendRequestReceived(userId: $userId) {\n      id\n      username\n      requestStatus\n    }\n  }\n": types.OnFriendRequestReceivedDocument,
    "\n  mutation addNewFriend($friendId: Int!) {\n    addFriend(friendId: $friendId) {\n      id\n      username\n      status\n    }\n  }\n": types.AddNewFriendDocument,
    "\n                fragment NewFriend on Friend {\n                  id\n                  username\n                  status\n                }\n              ": types.NewFriendFragmentDoc,
    "\n  mutation deleteFriend($friendId: Int!) {\n    deleteFriend(friendId: $friendId) {\n      success\n    }\n  }\n": types.DeleteFriendDocument,
    "\n  subscription OnFriendProfileChanged($userId: Int!) {\n    friendProfileChanged(userId: $userId) {\n      id\n      username\n      status\n    }\n  }\n": types.OnFriendProfileChangedDocument,
    "\n  subscription OnFriendRequestConfirmed($userId: Int!) {\n    friendRequestConfirmed(userId: $userId) {\n      newFriend {\n        id\n        username\n        status\n      }\n      newConversation {\n        id\n        createdAt\n        member {\n          id\n          username\n        }\n      }\n    }\n  }\n": types.OnFriendRequestConfirmedDocument,
    "\n  subscription OnFriendDeleted($userId: Int!) {\n    friendDeleted(userId: $userId)\n  }\n": types.OnFriendDeletedDocument,
    "\n  query GetFriends {\n    me {\n      friends {\n        id\n        username\n        status\n      }\n    }\n  }\n": types.GetFriendsDocument,
    "\n  mutation hideConversation($conversationId: Int!) {\n    hideConversation(conversationId: $conversationId) {\n      id\n    }\n  }\n": types.HideConversationDocument,
    "\n  query GetConversations {\n    me {\n      privateConversations {\n        id\n        createdAt\n        member {\n          id\n          username\n        }\n      }\n    }\n  }\n": types.GetConversationsDocument,
    "\n  mutation showConversation($friendId: Int!) {\n    showConversation(friendId: $friendId) {\n      id\n      createdAt\n      member {\n        id\n        username\n      }\n    }\n  }\n": types.ShowConversationDocument,
    "\n                fragment NewConversation on PrivateConversation {\n                  id\n                  createdAt\n                  member {\n                    id\n                    username\n                  }\n                }\n              ": types.NewConversationFragmentDoc,
    "\n  mutation addGroupMembers($groupId: Int!, $membersIds: [Int!]!) {\n    addGroupMembers(groupId: $groupId, membersIds: $membersIds) {\n      id\n      members {\n        id\n        username\n      }\n    }\n  }\n": types.AddGroupMembersDocument,
    "\n  mutation createGroup($membersIds: [Int!]!) {\n    createGroup(membersIds: $membersIds) {\n      id\n      name\n      createdAt\n      members {\n        id\n        username\n      }\n    }\n  }\n": types.CreateGroupDocument,
    "\n                fragment NewPrivateGroup on PrivateGroup {\n                  id\n                  name\n                  createdAt\n                  members {\n                    id\n                    username\n                  }\n                }\n              ": types.NewPrivateGroupFragmentDoc,
    "\n  mutation editGroupName($input: EditNameInput!) {\n    editGroupName(editNameInput: $input) {\n      id\n      name\n    }\n  }\n": types.EditGroupNameDocument,
    "\n  mutation leaveGroup($groupId: Int!) {\n    leaveGroup(groupId: $groupId) {\n      id\n    }\n  }\n": types.LeaveGroupDocument,
    "\n  query GetGroups {\n    me {\n      privateGroups {\n        id\n        createdAt\n        name\n        members {\n          id\n          username\n        }\n      }\n    }\n  }\n": types.GetGroupsDocument,
    "\n  mutation editProfile($input: EditProfileInput!) {\n    editProfile(editProfileInput: $input) {\n      id\n      username\n      status\n      phoneNumber\n      email\n    }\n  }\n": types.EditProfileDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AuthUserFields on AuthUser {\n    id\n    username\n    createdAt\n    email\n    status\n    phoneNumber\n    friends {\n      id\n      username\n      status\n    }\n    friendRequests {\n      id\n      username\n      requestStatus\n    }\n    privateConversations {\n      id\n      createdAt\n      member {\n        id\n        username\n      }\n    }\n    privateGroups {\n      id\n      createdAt\n      name\n      members {\n        id\n        username\n      }\n    }\n    newMessagesNotifications {\n      id\n      channelId\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  fragment AuthUserFields on AuthUser {\n    id\n    username\n    createdAt\n    email\n    status\n    phoneNumber\n    friends {\n      id\n      username\n      status\n    }\n    friendRequests {\n      id\n      username\n      requestStatus\n    }\n    privateConversations {\n      id\n      createdAt\n      member {\n        id\n        username\n      }\n    }\n    privateGroups {\n      id\n      createdAt\n      name\n      members {\n        id\n        username\n      }\n    }\n    newMessagesNotifications {\n      id\n      channelId\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ChannelMemberFields on ChannelMember {\n    id\n    username\n    createdAt\n  }\n"): (typeof documents)["\n  fragment ChannelMemberFields on ChannelMember {\n    id\n    username\n    createdAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MessageInfo on Message {\n    id\n    type\n    createdAt\n    editedAt\n    content\n    channelId\n    author {\n      ...ChannelMemberFields\n    }\n    referencedMessage {\n      id\n      content\n      author {\n        ...ChannelMemberFields\n      }\n      mentions {\n        ...ChannelMemberFields\n      }\n    }\n    mentions {\n      ...ChannelMemberFields\n    }\n  }\n"): (typeof documents)["\n  fragment MessageInfo on Message {\n    id\n    type\n    createdAt\n    editedAt\n    content\n    channelId\n    author {\n      ...ChannelMemberFields\n    }\n    referencedMessage {\n      id\n      content\n      author {\n        ...ChannelMemberFields\n      }\n      mentions {\n        ...ChannelMemberFields\n      }\n    }\n    mentions {\n      ...ChannelMemberFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  \n  query GetAuthUser {\n    me {\n      ...AuthUserFields\n    }\n  }\n"): (typeof documents)["\n  \n  query GetAuthUser {\n    me {\n      ...AuthUserFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  \n  mutation LoginUser($input: LoginUserInput!) {\n    login(loginUserInput: $input) {\n      ...AuthUserFields\n    }\n  }\n"): (typeof documents)["\n  \n  mutation LoginUser($input: LoginUserInput!) {\n    login(loginUserInput: $input) {\n      ...AuthUserFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation logoutUser {\n    logout {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation logoutUser {\n    logout {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  \n  mutation RegisterUser($input: RegisterUserInput!) {\n    register(registerUserInput: $input) {\n      ...AuthUserFields\n    }\n  }\n"): (typeof documents)["\n  \n  mutation RegisterUser($input: RegisterUserInput!) {\n    register(registerUserInput: $input) {\n      ...AuthUserFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMessages($channelId: Int!, $cursor: String, $limit: Int) {\n    getMessages(channelId: $channelId, cursor: $cursor, limit: $limit) {\n      cursor\n      messages {\n        ...MessageInfo\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMessages($channelId: Int!, $cursor: String, $limit: Int) {\n    getMessages(channelId: $channelId, cursor: $cursor, limit: $limit) {\n      cursor\n      messages {\n        ...MessageInfo\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  subscription OnMessageReceived($userId: Int!) {\n    messageReceived(userId: $userId) {\n      ...MessageInfo\n    }\n  }\n"): (typeof documents)["\n  subscription OnMessageReceived($userId: Int!) {\n    messageReceived(userId: $userId) {\n      ...MessageInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation sendMessage($input: SendMessageInput!) {\n    sendMessage(sendMessageInput: $input) {\n      ...MessageInfo\n    }\n  }\n"): (typeof documents)["\n  mutation sendMessage($input: SendMessageInput!) {\n    sendMessage(sendMessageInput: $input) {\n      ...MessageInfo\n    }\n  }\n"];
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
export function graphql(source: "\n  mutation sendFriendRequest($input: FriendTag!) {\n    sendFriendRequest(friendTag: $input) {\n      id\n      username\n      requestStatus\n    }\n  }\n"): (typeof documents)["\n  mutation sendFriendRequest($input: FriendTag!) {\n    sendFriendRequest(friendTag: $input) {\n      id\n      username\n      requestStatus\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n                fragment NewFriendRequest on FriendRequest {\n                  id\n                  username\n                  requestStatus\n                }\n              "): (typeof documents)["\n                fragment NewFriendRequest on FriendRequest {\n                  id\n                  username\n                  requestStatus\n                }\n              "];
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
export function graphql(source: "\n      fragment friendRequests on AuthUser {\n        friendRequests {\n          id\n          username\n          requestStatus\n        }\n      }\n    "): (typeof documents)["\n      fragment friendRequests on AuthUser {\n        friendRequests {\n          id\n          username\n          requestStatus\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ignoreFriendRequest($friendId: Int!) {\n    ignoreFriendRequest(friendId: $friendId) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation ignoreFriendRequest($friendId: Int!) {\n    ignoreFriendRequest(friendId: $friendId) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription OnFriendRequestReceived($userId: Int!) {\n    friendRequestReceived(userId: $userId) {\n      id\n      username\n      requestStatus\n    }\n  }\n"): (typeof documents)["\n  subscription OnFriendRequestReceived($userId: Int!) {\n    friendRequestReceived(userId: $userId) {\n      id\n      username\n      requestStatus\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addNewFriend($friendId: Int!) {\n    addFriend(friendId: $friendId) {\n      id\n      username\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation addNewFriend($friendId: Int!) {\n    addFriend(friendId: $friendId) {\n      id\n      username\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n                fragment NewFriend on Friend {\n                  id\n                  username\n                  status\n                }\n              "): (typeof documents)["\n                fragment NewFriend on Friend {\n                  id\n                  username\n                  status\n                }\n              "];
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
export function graphql(source: "\n  subscription OnFriendRequestConfirmed($userId: Int!) {\n    friendRequestConfirmed(userId: $userId) {\n      newFriend {\n        id\n        username\n        status\n      }\n      newConversation {\n        id\n        createdAt\n        member {\n          id\n          username\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription OnFriendRequestConfirmed($userId: Int!) {\n    friendRequestConfirmed(userId: $userId) {\n      newFriend {\n        id\n        username\n        status\n      }\n      newConversation {\n        id\n        createdAt\n        member {\n          id\n          username\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription OnFriendDeleted($userId: Int!) {\n    friendDeleted(userId: $userId)\n  }\n"): (typeof documents)["\n  subscription OnFriendDeleted($userId: Int!) {\n    friendDeleted(userId: $userId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFriends {\n    me {\n      friends {\n        id\n        username\n        status\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFriends {\n    me {\n      friends {\n        id\n        username\n        status\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation hideConversation($conversationId: Int!) {\n    hideConversation(conversationId: $conversationId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation hideConversation($conversationId: Int!) {\n    hideConversation(conversationId: $conversationId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetConversations {\n    me {\n      privateConversations {\n        id\n        createdAt\n        member {\n          id\n          username\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetConversations {\n    me {\n      privateConversations {\n        id\n        createdAt\n        member {\n          id\n          username\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation showConversation($friendId: Int!) {\n    showConversation(friendId: $friendId) {\n      id\n      createdAt\n      member {\n        id\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation showConversation($friendId: Int!) {\n    showConversation(friendId: $friendId) {\n      id\n      createdAt\n      member {\n        id\n        username\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  mutation createGroup($membersIds: [Int!]!) {\n    createGroup(membersIds: $membersIds) {\n      id\n      name\n      createdAt\n      members {\n        id\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createGroup($membersIds: [Int!]!) {\n    createGroup(membersIds: $membersIds) {\n      id\n      name\n      createdAt\n      members {\n        id\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n                fragment NewPrivateGroup on PrivateGroup {\n                  id\n                  name\n                  createdAt\n                  members {\n                    id\n                    username\n                  }\n                }\n              "): (typeof documents)["\n                fragment NewPrivateGroup on PrivateGroup {\n                  id\n                  name\n                  createdAt\n                  members {\n                    id\n                    username\n                  }\n                }\n              "];
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
export function graphql(source: "\n  query GetGroups {\n    me {\n      privateGroups {\n        id\n        createdAt\n        name\n        members {\n          id\n          username\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetGroups {\n    me {\n      privateGroups {\n        id\n        createdAt\n        name\n        members {\n          id\n          username\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation editProfile($input: EditProfileInput!) {\n    editProfile(editProfileInput: $input) {\n      id\n      username\n      status\n      phoneNumber\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation editProfile($input: EditProfileInput!) {\n    editProfile(editProfileInput: $input) {\n      id\n      username\n      status\n      phoneNumber\n      email\n    }\n  }\n"];

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
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;