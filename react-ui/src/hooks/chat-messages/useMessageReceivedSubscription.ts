import { useSubscription } from "@apollo/client";
import { useParams } from "react-router-dom";
import { AUTH_USER_FIELDS } from "../../fragments/auth";
import { MESSAGE_INFO } from "../../fragments/messages";
import { graphql, useFragment } from "../../gql";
import { GetAuthUserQuery } from "../../gql/graphql";
import useAuthUser, { GET_AUTH_USER } from "../auth/useAuthUser";
import { GET_CHAT_MESSAGES } from "./useChatMessages";
import useChatScrollContext from "./useChatScrollContext";

const MESSAGE_RECEIVED_SUBSCRIPTION = graphql(`
  subscription OnMessageReceived($userId: Int!) {
    messageReceived(userId: $userId) {
      ...MessageInfo
    }
  }
`);

const useMessageReceivedSubscription = () => {
  const { channelId } = useParams();
  const chatScrollRef = useChatScrollContext();
  const { data: authUserData } = useAuthUser({ fetchPolicy: "cache-only" });
  return useSubscription(MESSAGE_RECEIVED_SUBSCRIPTION, {
    variables: { userId: authUserData!.me.id },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const newMessage = useFragment(MESSAGE_INFO, subscriptionData.data?.messageReceived);
      if (!newMessage) return;
      const messagesCacheId = { query: GET_CHAT_MESSAGES, variables: { channelId: newMessage.channelId } };
      const existing = client.readQuery(messagesCacheId);
      const existingMessages = existing ? useFragment(MESSAGE_INFO, existing.getMessages.messages) : [];
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

      const authUserCacheId = { query: GET_AUTH_USER };
      const existingAuthUser = client.readQuery(authUserCacheId);
      const existingUnreadMessages = existingAuthUser?.me.newMessagesNotifications;
      client.writeQuery({
        ...authUserCacheId,
        data: {
          me: {
            ...existingAuthUser?.me,
            newMessagesNotifications: [
              ...existingUnreadMessages,
              { id: newMessage.id, channelId: newMessage.channelId, createdAt: newMessage.createdAt },
            ],
          },
        },
      });

      const discordSoundNotification = new Audio("/discord-notification.mp3");
      discordSoundNotification.play();
    },
  });
};

export default useMessageReceivedSubscription;
