import { useLayoutEffect, useRef, useState } from "react";
import useIntersectionObserver from "../ui/useIntersectionObserver";
import useChatScrollContext from "./useChatScrollContext";

const useChatInfiniteScroll = (fetchMoreMessages: () => void) => {
  const infiniteScrollDivRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useChatScrollContext();
  const [distanceFromBottom, setDistanceFromBottom] = useState(0);
  useIntersectionObserver(() => {
    const getMoreMessages = async () => {
      if (scrollContainerRef.current) {
        const { scrollHeight, clientHeight, scrollTop } = scrollContainerRef.current;
        setDistanceFromBottom(scrollHeight - clientHeight - scrollTop);
      }
      fetchMoreMessages();
    };
    getMoreMessages();
  }, infiniteScrollDivRef);

  useLayoutEffect(() => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTop = scrollHeight - clientHeight - distanceFromBottom;
    }
  }, [distanceFromBottom]);

  return { scrollContainerRef, infiniteScrollDivRef };
};

export default useChatInfiniteScroll;
