import { gql } from "@apollo/client";

export const AUTH_USER_FIELDS = gql`
  fragment AuthUserFields on AuthUser {
    id
    username
    createdAt
    email
    status
    phoneNumber
    friends {
      id
      username
      status
    }
    friendRequests {
      id
      username
      requestStatus
    }
    privateConversations {
      id
      createdAt
      member {
        id
        username
      }
    }
    privateGroups {
      id
      createdAt
      name
      members {
        id
        username
      }
    }
    newMessagesNotifications {
      id
      channelId
      createdAt
    }
  }
`;
