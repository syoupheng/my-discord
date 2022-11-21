import { gql, useQuery } from "@apollo/client";
import { PrivateConversation } from "../../types/private-conversation";

export const GET_AUTH_USER_CONVERSATIONS = gql`
  query GetFriends {
    me {
      privateConversations {
        id
        createdAt
        member {
          id
          username
        }
      }
    }
  }
`;

interface AuthFriendsResponse {
  me: { privateConversations: PrivateConversation[] };
}

const usePrivateConversations = () => {
  return useQuery<AuthFriendsResponse>(GET_AUTH_USER_CONVERSATIONS, { fetchPolicy: "cache-only" });
};

export default usePrivateConversations;
