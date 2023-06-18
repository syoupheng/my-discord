import { useSubscription } from "@apollo/client";
import { graphql } from "@/gql";
import { MessageFragment } from "@/gql/graphql";
import { GET_CHAT_MESSAGES } from "@/hooks/chat-messages/useChatMessages";

const MESSAGE_DELETED_SUBSCRIPTION = graphql(`
  subscription OnMessageDeleted($userId: Int!) {
    messageDeleted(userId: $userId) {
      id
      channelId
    }
  }
`);

const useMessageDeletedSubscription = (authUserId: number) => {
  return useSubscription(MESSAGE_DELETED_SUBSCRIPTION, {
    variables: { userId: authUserId },
    onSubscriptionData: ({ client, subscriptionData: { data } }) => {
      if (!data) return;
      const { channelId, id: messageId } = data.messageDeleted;
      const cacheId = { query: GET_CHAT_MESSAGES, variables: { channelId: channelId } };
      const existing = client.readQuery(cacheId);
      const existingMessages = existing ? existing.getMessages.messages : [];
      const newMessages: MessageFragment[] = [];
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
