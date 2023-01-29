import { OnSubscriptionDataOptions } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OnUserTypingSubscription } from "../../gql/graphql";
import useTypingSubscription from "./useTypingSubscription";

interface TUserTypingData {
  username: string;
  timeout: number;
}

const TYPING_NOTIFICATION_DURATION = 4500;

const useUserTypingNotification = () => {
  const { channelId } = useParams();
  const [usersTyping, setUsersTyping] = useState<Record<number, TUserTypingData | null>>({});

  useEffect(() => {
    setUsersTyping({});
  }, [channelId]);

  const onUserTyping = ({ subscriptionData: { data } }: OnSubscriptionDataOptions<OnUserTypingSubscription>) => {
    if (!data) return;
    const {
      userTyping: { userId, username },
    } = data;
    if (data.userTyping.channelId !== parseInt(channelId!)) return;
    const timeout = window.setTimeout(() => {
      setUsersTyping((prev) => {
        const newUsersTyping = { ...prev };
        newUsersTyping[userId] = null;
        return newUsersTyping;
      });
    }, TYPING_NOTIFICATION_DURATION);
    setUsersTyping((prev) => {
      const newUsersTyping = { ...prev };
      if (newUsersTyping[userId] && newUsersTyping[userId]!.timeout) clearTimeout(newUsersTyping[userId]!.timeout);
      newUsersTyping[userId] = { username, timeout };
      return newUsersTyping;
    });
  };
  useTypingSubscription(onUserTyping, parseInt(channelId!));
  return Object.entries(usersTyping).filter(([, user]) => user !== null) as Array<[string, TUserTypingData]>;
};

export default useUserTypingNotification;
