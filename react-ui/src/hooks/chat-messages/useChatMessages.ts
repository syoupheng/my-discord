import { useQuery } from "@apollo/client";
import { graphql } from "../../gql";
import useLogoutOnError from "../auth/useLogoutOnError";

const GET_CHAT_MESSAGES = graphql(`
  query messages($channelId: Int!, $cursor: String, $limit: Int) {
    messages(channelId: $channelId, cursor: $cursor, limit: $limit) {
      id
      type
      createdAt
      editedAt
      content
      channelId
      author {
        id
        username
        createdAt
      }
      referencedMessage {
        id
        content
        author {
          id
          username
          createdAt
        }
        mentions {
          id
          username
          createdAt
        }
      }
      mentions {
        id
        username
        createdAt
      }
    }
  }
`);

const useChatMessages = (channelId: number) => {
  const onError = useLogoutOnError();
  return useQuery(GET_CHAT_MESSAGES, { variables: { channelId }, fetchPolicy: "cache-first", onError });
};

export default useChatMessages;
