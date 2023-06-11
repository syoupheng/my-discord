import { Reference, useSubscription } from "@apollo/client";
import useAuthUserCache from "@/hooks/auth/useAuthUserCache";
import { useParams } from "react-router-dom";
import { AUTH_USER_CACHE_ID } from "@/apollo.config";
import { MESSAGE_NOTIFICATION_FRAGMENT } from "@/fragments/auth";
import { graphql } from "@/gql";
import useChatScrollContext from "@/hooks/chat-messages/useChatScrollContext";
import { GET_CHAT_MESSAGES } from "@/hooks/chat-messages/useChatMessages";

const MESSAGE_RECEIVED_SUBSCRIPTION = graphql(`
  subscription OnMessageReceived($userId: Int!) {
    messageReceived(userId: $userId) {
      ...Message
    }
  }
`);

const useMessageReceivedSubscription = () => {
  const { channelId } = useParams();
  const chatScrollRef = useChatScrollContext();
  const authUserData = useAuthUserCache();
  return useSubscription(MESSAGE_RECEIVED_SUBSCRIPTION, {
    variables: { userId: authUserData.id },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const newMessage = subscriptionData.data?.messageReceived;
      if (!newMessage) return;
      const messagesCacheId = { query: GET_CHAT_MESSAGES, variables: { channelId: newMessage.channelId } };
      const existing = client.readQuery(messagesCacheId);
      const existingMessages = existing ? existing.getMessages.messages : [];
      client.writeQuery({
        ...messagesCacheId,
        data: {
          getMessages: {
            ...existing?.getMessages,
            messages: [...existingMessages, newMessage],
          },
        },
      });

      const isOnChannel = !!channelId && newMessage.channelId === parseInt(channelId);
      const isOnBottomOfChat =
        !!chatScrollRef.current &&
        Math.abs(chatScrollRef.current.scrollHeight - chatScrollRef.current.clientHeight - chatScrollRef.current.scrollTop) < 1;

      if (isOnChannel && isOnBottomOfChat) {
        setTimeout(() => {
          if (isOnChannel && chatScrollRef.current) chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
        }, 200);
      }

      client.cache.modify({
        id: AUTH_USER_CACHE_ID,
        fields: {
          newMessagesNotifications(existingUnreadMessagesRefs = [], { readField }) {
            console.log({ existingUnreadMessagesRefs });
            const newNotification = client.cache.writeFragment({
              fragment: MESSAGE_NOTIFICATION_FRAGMENT,
              data: { __typename: "Message", id: newMessage.id, channelId: newMessage.channelId, createdAt: newMessage.createdAt },
            });

            if (existingUnreadMessagesRefs.some((ref: Reference) => readField("id", ref) === newNotification)) return existingUnreadMessagesRefs;

            return [...existingUnreadMessagesRefs, newNotification];
          },
        },
      });
      // client.writeQuery({
      //   ...authUserCacheId,
      //   data: {
      //     me: {
      //       ...existingAuthUser.me,
      //       newMessagesNotifications: [
      //         ...existingUnreadMessages,
      //         { id: newMessage.id, channelId: newMessage.channelId, createdAt: newMessage.createdAt },
      //       ],
      //     },
      //   },
      // });
      // client.cache.updateQuery(authUserCacheId, (existingData) => ({
      //   me: {
      //     ...existingData?.me!,
      //     newMessagesNotifications: [
      //       ...existingUnreadMessages,
      //       { id: newMessage.id, channelId: newMessage.channelId, createdAt: newMessage.createdAt },
      //     ],
      //   },
      // }));

      if (authUserData.status !== "DO_NOT_DISTURB") {
        const discordSoundNotification = new Audio("/discord-notification.mp3");
        discordSoundNotification.play();
      }
    },
  });
};

export default useMessageReceivedSubscription;
