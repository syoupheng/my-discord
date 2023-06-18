import useChatScrollContext from "@/hooks/chat-messages/useChatScrollContext";
import useIntersectionObserver from "@/hooks/ui/useIntersectionObserver";
import { useRef } from "react";

const useChatInfiniteScroll = (fetchMoreMessages: () => void) => {
  const infiniteScrollDivRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useChatScrollContext();
  useIntersectionObserver(() => {
    fetchMoreMessages();
  }, infiniteScrollDivRef);

  return { scrollContainerRef, infiniteScrollDivRef };
};

export default useChatInfiniteScroll;
