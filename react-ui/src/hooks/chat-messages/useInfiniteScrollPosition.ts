import { MessageFragment } from "@/gql/graphql";
import { useMessageItemScrollContext } from "@/providers/MessageItemScrollProvider";
import { MutableRefObject, useLayoutEffect } from "react";

const useInfiniteScrollPosition = (
  messages: MessageFragment[] | undefined,
  previousCursorRef: MutableRefObject<null>,
  cursor: string | undefined
) => {
  const { scrollToId } = useMessageItemScrollContext();
  useLayoutEffect(() => {
    if (!messages) return;
    const lastMessage = messages.find((msg) => msg.createdAt === previousCursorRef.current);
    if (!lastMessage) return;
    scrollToId(lastMessage.id);
  }, [cursor]);
};

export default useInfiniteScrollPosition;
