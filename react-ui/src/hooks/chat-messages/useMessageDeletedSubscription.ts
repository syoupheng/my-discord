import { useSubscription } from "@apollo/client";
import { MESSAGE_INFO } from "../../fragments/messages";
import { graphql, useFragment } from "../../gql";
import { MessageInfoFragment } from "../../gql/graphql";
import useAuthUser from "../auth/useAuthUser";
import { GET_CHAT_MESSAGES } from "./useChatMessages";

const MESSAGE_DELETED_SUBSCRIPTION = graphql(`
  subscription OnMessageDeleted($userId: Int!) {
    messageDeleted(userId: $userId) {
      id
      channelId
    }
  }
`);

const useMessageDeletedSubscription = () => {
  const { data: authUserData } = useAuthUser({ fetchPolicy: "cache-only" });
  return useSubscription(MESSAGE_DELETED_SUBSCRIPTION, {
    variables: { userId: authUserData!.me.id },
    onSubscriptionData: ({ client, subscriptionData: { data } }) => {
      if (!data) return;
      const { channelId, id: messageId } = data.messageDeleted;
      const cacheId = { query: GET_CHAT_MESSAGES, variables: { channelId: channelId } };
      const existing = client.readQuery(cacheId);
      const existingMessages = existing ? useFragment(MESSAGE_INFO, existing.getMessages.messages) : [];
      const newMessages: MessageInfoFragment[] = [];
      existingMessages.forEach((message) => {
        if (message.id !== messageId)
          newMessages.push(message.referencedMessage?.id === messageId ? { ...message, referencedMessage: null } : { ...message });
      });
      client.writeQuery({
        ...cacheId,
        data: {
          getMessages: {
            ...existing?.getMessages,
            messages: newMessages,
          },
        },
      });
    },
  });
};

export default useMessageDeletedSubscription;
