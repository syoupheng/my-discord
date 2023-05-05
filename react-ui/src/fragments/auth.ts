import { gql } from "@apollo/client";

export const AUTH_USER_FIELDS = gql`
  fragment AuthUserFields on AuthUser {
    id
    username
    createdAt
    email
    status
    phoneNumber
    avatarColor
    friends {
      id
      username
      status
      avatarColor
    }
    friendRequests {
      id
      username
      requestStatus
      avatarColor
    }
    privateConversations {
      id
      createdAt
      member {
        id
        username
        avatarColor
      }
    }
    privateGroups {
      id
      createdAt
      name
      avatarColor
      members {
        id
        username
        avatarColor
      }
    }
    newMessagesNotifications {
      id
      channelId
      createdAt
    }
  }
`;
