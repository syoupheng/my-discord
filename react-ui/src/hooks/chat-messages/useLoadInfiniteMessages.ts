import useChatInfiniteScroll from "@/hooks/chat-messages/useChatInfiniteScroll";
import useChatMessages, { MESSAGES_LIMIT } from "@/hooks/chat-messages/useChatMessages";
import { MutableRefObject } from "react";

const useLoadInfiniteMessages = (channelId: string, previousCursorRef: MutableRefObject<null>) => {
  const { data, loading, fetchMore, error } = useChatMessages(parseInt(channelId));
  const { scrollContainerRef, infiniteScrollDivRef } = useChatInfiniteScroll(() => {
    if (loading || !data?.getMessages.cursor || error) return;
    fetchMore({
      variables: { cursor: data?.getMessages.cursor, limit: MESSAGES_LIMIT },
      updateQuery: (previousResults, { fetchMoreResult }) => {
        previousCursorRef.current = previousResults.getMessages.cursor;
        const { cursor: newCursor, messages: newMessages } = fetchMoreResult.getMessages;
        return {
          getMessages: {
            cursor: newCursor,
            messages: [...newMessages, ...previousResults.getMessages.messages],
          },
        };
      },
    });
  });
  return { messagesData: data, loadingMessages: loading, scrollContainerRef, infiniteScrollDivRef, loadMessagesError: error };
};

export default useLoadInfiniteMessages;
