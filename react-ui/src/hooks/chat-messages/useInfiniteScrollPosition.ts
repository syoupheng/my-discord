import { MutableRefObject, useLayoutEffect } from "react";
import { useMessageItemScrollContext } from "../../providers/MessageItemScrollProvider";
import { Message } from "../../gql/graphql";

const useInfiniteScrollPosition = (messages: Message[] | undefined, previousCursorRef: MutableRefObject<null>, cursor: string | undefined) => {
  const { scrollToId } = useMessageItemScrollContext();
  useLayoutEffect(() => {
    if (!messages) return;
    const lastMessage = messages.find((msg) => msg.createdAt === previousCursorRef.current);
    if (!lastMessage) return;
    scrollToId(lastMessage.id);
  }, [cursor]);
};

export default useInfiniteScrollPosition;
