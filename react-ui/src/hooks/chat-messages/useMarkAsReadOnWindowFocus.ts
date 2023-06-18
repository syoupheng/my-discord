import useChatScrollContext from "@/hooks/chat-messages/useChatScrollContext";
import useMarkMessagesAsRead from "@/hooks/chat-messages/useMarkMessagesAsRead";
import useMessageNotifications from "@/hooks/chat-messages/useMessageNotifications";
import useWindowFocus from "@/hooks/ui/useWindowFocus";
import { useParams } from "react-router-dom";

const useMarkAsReadOnWindowFocus = () => {
  const { channelId } = useParams();
  if (!channelId) return;
  const newMessagesNotifications = useMessageNotifications();
  const unreadMessagesIds = newMessagesNotifications.filter((message) => message.channelId === parseInt(channelId!)).map(({ id }) => id) ?? [];
  const [markAsRead, { loading }] = useMarkMessagesAsRead(unreadMessagesIds);
  const chatScrollRef = useChatScrollContext();

  const onWindowFocus = () => {
    const isOnBottomOfChat =
      !!chatScrollRef.current &&
      Math.abs(chatScrollRef.current.scrollHeight - chatScrollRef.current.clientHeight - chatScrollRef.current.scrollTop) < 1;
    if (unreadMessagesIds.length > 0 && isOnBottomOfChat && !loading) markAsRead();
  };

  useWindowFocus(onWindowFocus, [unreadMessagesIds]);
};

export default useMarkAsReadOnWindowFocus;
