import { useParams } from "react-router-dom";
import useAuthUser from "../auth/useAuthUser";
import useWindowFocus from "../ui/useWindowFocus";
import useChatScrollContext from "./useChatScrollContext";
import useMarkMessagesAsRead from "./useMarkMessagesAsRead";

const useMarkAsReadOnWindowFocus = () => {
  const { channelId } = useParams();
  if (!channelId) return;
  const { data } = useAuthUser();
  const unreadMessagesIds =
    data?.me.newMessagesNotifications.filter((message) => message.channelId === parseInt(channelId!)).map(({ id }) => id) ?? [];
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
