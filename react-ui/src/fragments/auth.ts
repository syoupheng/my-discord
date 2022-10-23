import { gql } from "@apollo/client";

export const AUTH_USER_FIELDS = gql`
  fragment AuthUserFields on AuthUser {
    id
    username
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
  }
`;
