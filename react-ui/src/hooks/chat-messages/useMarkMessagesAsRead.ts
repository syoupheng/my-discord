import { AUTH_USER_CACHE_ID } from "../../apollo.config";
import { graphql } from "../../gql";
import useAuthMutation from "../auth/useAuthMutation";

const MARK_MESSSAGES_AS_READ = graphql(`
  mutation markMessagesAsRead($messagesIds: [Int!]!) {
    markMessagesAsRead(messagesIds: $messagesIds)
  }
`);

const useMarkMessagesAsRead = (unreadMessagesIds: number[]) => {
  return useAuthMutation(MARK_MESSSAGES_AS_READ, {
    variables: { messagesIds: unreadMessagesIds },
    update(cache) {
      cache.modify({
        id: AUTH_USER_CACHE_ID,
        fields: {
          newMessagesNotifications(existingUnreadMessages, { readField }) {
            return existingUnreadMessages.filter((ref: any) => !unreadMessagesIds.includes(readField("id", ref) as number));
          },
        },
      });
    },
  });
};

export default useMarkMessagesAsRead;
