import { MessageNotificationFragment } from "@/gql/graphql";
import useMessageNotifications from "@/hooks/chat-messages/useMessageNotifications";
import { getMillisecondsDiff } from "@/utils/dates";
import { useMemo, useState } from "react";

const useChatUnreadMessages = (channelId: string) => {
  const newMessagesNotifications = useMessageNotifications();
  const unreadMessages = useMemo(
    () => newMessagesNotifications.filter((message) => message.channelId === parseInt(channelId)),
    [newMessagesNotifications, channelId]
  );

  const [oldestUnreadMessage, setOldestUnreadMessage] = useState<MessageNotificationFragment | null>(null);
  if (!oldestUnreadMessage && unreadMessages.length > 0) {
    setOldestUnreadMessage(unreadMessages.reduce((prev, current) => (getMillisecondsDiff(prev.createdAt, current.createdAt) > 0 ? current : prev)));
  }
  return { unreadMessages, oldestUnreadMessage };
};

export default useChatUnreadMessages;
