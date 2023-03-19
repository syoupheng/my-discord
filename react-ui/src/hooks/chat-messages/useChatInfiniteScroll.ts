import { useRef } from "react";
import useIntersectionObserver from "../ui/useIntersectionObserver";
import useChatScrollContext from "./useChatScrollContext";

const useChatInfiniteScroll = (fetchMoreMessages: () => void) => {
  const infiniteScrollDivRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useChatScrollContext();
  useIntersectionObserver(() => {
    fetchMoreMessages();
  }, infiniteScrollDivRef);

  return { scrollContainerRef, infiniteScrollDivRef };
};

export default useChatInfiniteScroll;
