import useMessageNotifications from "@/hooks/chat-messages/useMessageNotifications";

const useUnreadMessages = () => {
  const newMessagesNotifications = useMessageNotifications();
  const notificationsMap = new Map<number, number>([]);
  newMessagesNotifications.forEach(({ channelId }) => {
    const currentCount = notificationsMap.get(channelId) ?? 0;
    notificationsMap.set(channelId, currentCount + 1);
  });
  return notificationsMap;
};

export default useUnreadMessages;
