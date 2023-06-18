import { GetMessagesQuery, MessageNotificationFragment } from "@/gql/graphql";
import useMarkMessagesAsRead from "@/hooks/chat-messages/useMarkMessagesAsRead";
import useIntersectionObserver from "@/hooks/ui/useIntersectionObserver";
import { useLayoutEffect, useRef } from "react";

const useScrollChatBottom = (messagesData: GetMessagesQuery | undefined, unreadMessages: MessageNotificationFragment[]) => {
  const bottomMessageListRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (bottomMessageListRef.current) bottomMessageListRef.current.scrollIntoView();
  };
  const loadedInitialData = useRef(false);
  useLayoutEffect(() => {
    if (!loadedInitialData.current) scrollToBottom();
    if (messagesData) loadedInitialData.current = true;
  }, [messagesData]);

  const unreadMessagesIds = unreadMessages.map(({ id }) => id) ?? [];
  const [markAsRead, { loading }] = useMarkMessagesAsRead(unreadMessagesIds);
  useIntersectionObserver(() => {
    if (document.visibilityState === "visible" && document.hasFocus() && !loading && unreadMessagesIds.length > 0) markAsRead();
  }, bottomMessageListRef);
  return bottomMessageListRef;
};

export default useScrollChatBottom;
