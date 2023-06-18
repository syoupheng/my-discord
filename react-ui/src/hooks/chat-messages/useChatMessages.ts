import { graphql } from "@/gql";
import useLogoutOnError from "@/hooks/auth/useLogoutOnError";
import { useQuery } from "@apollo/client";

export const GET_CHAT_MESSAGES = graphql(`
  query GetMessages($channelId: Int!, $cursor: String, $limit: Int) {
    getMessages(channelId: $channelId, cursor: $cursor, limit: $limit) {
      cursor
      messages {
        ...Message
      }
    }
  }
`);

export const MESSAGES_LIMIT = 30;

const useChatMessages = (channelId: number) => {
  const onError = useLogoutOnError();
  return useQuery(GET_CHAT_MESSAGES, {
    variables: { channelId, limit: MESSAGES_LIMIT },
    fetchPolicy: "cache-first",
    onError,
    notifyOnNetworkStatusChange: true,
  });
};

export default useChatMessages;
