import { useEffect, useLayoutEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { GetMessagesQuery } from "../../gql/graphql";
import useAuthUser from "../auth/useAuthUser";
import useIntersectionObserver from "../ui/useIntersectionObserver";
import useMarkMessagesAsRead from "./useMarkMessagesAsRead";

const useScrollChatBottom = (messagesData: GetMessagesQuery | undefined) => {
  const { channelId } = useParams();
  const bottomMessageListRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (bottomMessageListRef.current) bottomMessageListRef.current.scrollIntoView();
  };
  const loadedInitialData = useRef(false);
  const currentChannelId = useRef(channelId);
  useEffect(() => {
    loadedInitialData.current = false;
  }, [channelId]);
  useLayoutEffect(() => {
    if (currentChannelId.current !== channelId || !loadedInitialData.current) {
      scrollToBottom();
      currentChannelId.current = channelId;
    }
    if (messagesData) loadedInitialData.current = true;
  }, [messagesData]);

  const { data } = useAuthUser();
  const unreadMessagesIds =
    data?.me.newMessagesNotifications.filter((message) => message.channelId === parseInt(channelId!)).map(({ id }) => id) ?? [];
  const [markAsRead, { loading }] = useMarkMessagesAsRead(unreadMessagesIds);
  useIntersectionObserver(() => {
    if (document.visibilityState === "visible" && document.hasFocus() && !loading && unreadMessagesIds.length > 0) markAsRead();
  }, bottomMessageListRef);
  return bottomMessageListRef;
};

export default useScrollChatBottom;
