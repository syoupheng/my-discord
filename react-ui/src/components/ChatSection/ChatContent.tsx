import ChatContentHeader from "@/components/ChatSection/ChatContentHeader";
import ChatMessageInput from "@/components/ChatSection/ChatMessageInput";
import ChatMessagesList from "@/components/ChatSection/ChatMessagesList";
import LoadingMessagesSkeleton from "@/components/ChatSection/LoadingSkeleton/LoadingMessagesSkeleton";
import NewMessagesBar from "@/components/ChatSection/NewMessagesBar";
import useChatUnreadMessages from "@/hooks/chat-messages/useChatUnreadMessages";
import useInfiniteScrollPosition from "@/hooks/chat-messages/useInfiniteScrollPosition";
import useLoadInfiniteMessages from "@/hooks/chat-messages/useLoadInfiniteMessages";
import useMarkAsReadOnWindowFocus from "@/hooks/chat-messages/useMarkAsReadOnWindowFocus";
import useScrollChatBottom from "@/hooks/chat-messages/useScrollChatBottom";
import useRequestTimeout from "@/hooks/shared/useRequestTimeout";
import useSafeParams from "@/hooks/shared/useSafeParams";
import ErrorPage from "@/pages/ErrorPage";
import SelectedMessageReplyProvider from "@/providers/SelectedMessageReplyProvider";
import { useRef, useState } from "react";

const ChatContent = () => {
  const { channelId } = useSafeParams(["channelId"]);
  const previousCursorRef = useRef(null);
  const { messagesData, loadingMessages, infiniteScrollDivRef, scrollContainerRef, loadMessagesError } = useLoadInfiniteMessages(
    channelId,
    previousCursorRef
  );
  useInfiniteScrollPosition(messagesData?.getMessages.messages, previousCursorRef, messagesData?.getMessages.cursor);
  const { unreadMessages, oldestUnreadMessage } = useChatUnreadMessages(channelId);
  const bottomMessageListRef = useScrollChatBottom(messagesData, unreadMessages);
  const { messages } = messagesData?.getMessages ?? { messages: [] };
  useMarkAsReadOnWindowFocus();
  const newMessagesRef = useRef<HTMLDivElement>(null);
  const [requestTimedout, setRequestTimedout] = useState(false);
  useRequestTimeout({
    isLoading: loadingMessages,
    onTimeout: () => {
      setRequestTimedout(true);
    },
  });
  if (loadMessagesError || requestTimedout) return <ErrorPage />;
  return (
    <SelectedMessageReplyProvider>
      <main className="relative flex flex-col min-w-0 min-h-0 flex-auto">
        <div className="flex relative flex-auto min-h-0 min-w-0">
          {unreadMessages.length > 0 && (
            <NewMessagesBar newMessagesRef={newMessagesRef} unreadMessages={unreadMessages} oldestUnreadMessage={oldestUnreadMessage} />
          )}
          <div
            ref={scrollContainerRef}
            className="absolute inset-0 overflow-y-scroll overflow-x-hidden min-h-0 scroll-container"
            style={{ overflowAnchor: "none" }}
          >
            <LoadingMessagesSkeleton className="absolute inset-0" show={loadingMessages && messages.length === 0} />
            {messagesData && (
              <ol className="flex flex-col min-h-0 overflow-hidden list-none justify-end items-stretch relative animate-fade-in-slow">
                {!messagesData.getMessages.cursor ? <ChatContentHeader /> : <LoadingMessagesSkeleton ref={infiniteScrollDivRef} />}
                <ChatMessagesList messages={messages} oldestUnreadMessage={oldestUnreadMessage} newMessagesRef={newMessagesRef} />
              </ol>
            )}
            <div ref={bottomMessageListRef} className="h-[30px] w-[1px] pointer-events-none"></div>
          </div>
        </div>
        <ChatMessageInput key={channelId} />
      </main>
    </SelectedMessageReplyProvider>
  );
};

export default ChatContent;
