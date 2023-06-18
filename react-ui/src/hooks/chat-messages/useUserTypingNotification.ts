import { OnUserTypingSubscription } from "@/gql/graphql";
import useTypingSubscription from "@/hooks/chat-messages/useTypingSubscription";
import useSafeParams from "@/hooks/shared/useSafeParams";
import { OnSubscriptionDataOptions } from "@apollo/client";
import { useState } from "react";

type UserTypingData = {
  username: string;
  timeout: number;
}

const TYPING_NOTIFICATION_DURATION = 4500;

const useUserTypingNotification = () => {
  const { channelId } = useSafeParams(["channelId"]);
  const [usersTyping, setUsersTyping] = useState<Record<number, UserTypingData | null>>({});

  const onUserTyping = ({ subscriptionData: { data } }: OnSubscriptionDataOptions<OnUserTypingSubscription>) => {
    if (!data) return;
    const {
      userTyping: { userId, username },
    } = data;
    if (data.userTyping.channelId !== parseInt(channelId)) return;
    const timeout = window.setTimeout(() => {
      setUsersTyping((prev) => {
        const newUsersTyping = { ...prev };
        newUsersTyping[userId] = null;
        return newUsersTyping;
      });
    }, TYPING_NOTIFICATION_DURATION);
    setUsersTyping((prev) => {
      const newUsersTyping = { ...prev };
      if (newUsersTyping[userId] && newUsersTyping[userId]?.timeout) clearTimeout(newUsersTyping[userId]?.timeout);
      newUsersTyping[userId] = { username, timeout };
      return newUsersTyping;
    });
  };
  useTypingSubscription(onUserTyping, parseInt(channelId));
  return Object.entries(usersTyping).filter(([, user]) => user !== null) as Array<[string, UserTypingData]>;
};

export default useUserTypingNotification;
