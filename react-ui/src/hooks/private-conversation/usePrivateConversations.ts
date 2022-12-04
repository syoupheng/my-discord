import { gql, useQuery } from "@apollo/client";
import { PrivateConversation } from "../../types/private-conversation";
import useLogoutOnError from "../auth/useLogoutOnError";

export const GET_AUTH_USER_CONVERSATIONS = gql`
  query GetConversations {
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

interface AuthConversationsResponse {
  me: { privateConversations: PrivateConversation[] };
}

const usePrivateConversations = () => {
  const onError = useLogoutOnError();
  return useQuery<AuthConversationsResponse>(GET_AUTH_USER_CONVERSATIONS, { fetchPolicy: "cache-only", onError });
};

export default usePrivateConversations;
