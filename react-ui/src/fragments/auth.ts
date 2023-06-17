import { graphql } from "../gql";

export const CHANNEL_MEMBER_FIELDS = graphql(`
  fragment ChannelMember on ChannelMember {
    id
    username
    discriminator
    createdAt
    avatarColor
  }
`);

export const FRIEND_FRAGMENT = graphql(`
  fragment Friend on Friend {
    id
    username
    discriminator
    status
    avatarColor
  }
`);

export const FRIEND_REQUEST_FRAGMENT = graphql(`
  fragment FriendRequest on FriendRequest {
    id
    username
    discriminator
    requestStatus
    avatarColor
  }
`);

export const PRIVATE_CONVERSATION_FRAGMENT = graphql(`
  fragment PrivateConversation on PrivateConversation {
    id
    createdAt
    member {
      ...ChannelMember
    }
  }
`);

export const PRIVATE_GROUP_FRAGMENT = graphql(`
  fragment PrivateGroup on PrivateGroup {
    id
    createdAt
    name
    avatarColor
    members {
      ...ChannelMember
    }
  }
`);

export const MESSAGE_NOTIFICATION_FRAGMENT = graphql(`
  fragment MessageNotification on Message {
    id
    channelId
    createdAt
  }
`);

export const AUTH_USER_INFO_FRAGMENT = graphql(`
  fragment AuthUserInfo on AuthUser {
    id
    username
    discriminator
    createdAt
    status
    phoneNumber
    avatarColor
  }
`);

export const AUTH_USER_FRAGMENT = graphql(`
  fragment AuthUser on AuthUser {
    ...AuthUserInfo
    friends {
      ...Friend
    }
    friendRequests {
      ...FriendRequest
    }
    privateConversations {
      ...PrivateConversation
    }
    privateGroups {
      ...PrivateGroup
    }
    newMessagesNotifications {
      ...MessageNotification
    }
  }
`);
