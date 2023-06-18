import { graphql } from "@/gql";
import { useQuery } from "@apollo/client";

export const GET_AUTH_USER_CONVERSATIONS = graphql(`
  query GetConversations {
    me {
      privateConversations {
        ...PrivateConversation
      }
    }
  }
`);

const usePrivateConversations = () => {
  const { data } = useQuery(GET_AUTH_USER_CONVERSATIONS, { fetchPolicy: "cache-only" });
  if (!data) throw new Error("This hook should be called in the authenticated part of the app");
  return data.me.privateConversations;
};

export default usePrivateConversations;
