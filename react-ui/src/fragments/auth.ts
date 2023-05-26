import { graphql } from "../gql";

export const CHANNEL_MEMBER_FIELDS = graphql(`
  fragment ChannelMemberFields on ChannelMember {
    id
    username
    createdAt
    avatarColor
  }
`);

export const FRIEND_FRAGMENT = graphql(`
  fragment FriendFields on Friend {
    id
    username
    status
    avatarColor
  }
`);

export const FRIEND_REQUEST_FRAGMENT = graphql(`
  fragment FriendRequestFields on FriendRequest {
    id
    username
    requestStatus
    avatarColor
  }
`);

export const PRIVATE_CONVERSATION_FRAGMENT = graphql(`
  fragment PrivateConversationFields on PrivateConversation {
    id
    createdAt
    member {
      ...ChannelMemberFields
    }
  }
`);

export const PRIVATE_GROUP_FRAGMENT = graphql(`
  fragment PrivateGroupFields on PrivateGroup {
    id
    createdAt
    name
    avatarColor
    members {
      ...ChannelMemberFields
    }
  }
`);

export const MESSAGE_NOTIFICATION_FRAGMENT = graphql(`
  fragment MessageNotificationFields on Message {
    id
    channelId
    createdAt
  }
`);

export const AUTH_USER_FRAGMENT = graphql(`
  fragment AuthUserFields on AuthUser {
    id
    username
    createdAt
    email
    status
    phoneNumber
    avatarColor
    friends {
      ...FriendFields
    }
    friendRequests {
      ...FriendRequestFields
    }
    privateConversations {
      ...PrivateConversationFields
    }
    privateGroups {
      ...PrivateGroupFields
    }
    newMessagesNotifications {
      ...MessageNotificationFields
    }
  }
`);
