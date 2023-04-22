import { useParams } from "react-router-dom";
import { MESSAGE_INFO } from "../../fragments/messages";
import { useFragment } from "../../gql";
import useChatInfiniteScroll from "../../hooks/chat-messages/useChatInfiniteScroll";
import useChatMessages, { MESSAGES_LIMIT } from "../../hooks/chat-messages/useChatMessages";
import useScrollChatBottom from "../../hooks/chat-messages/useScrollChatBottom";
import MessageReplyProvider from "../../providers/SelectedMessageReplyProvider";
import ReplyScrollProvider from "../../providers/ClickedReplyProvider";
import ChatMessageInput from "./ChatMessageInput";
import ChatMessagesList from "./ChatMessagesList";
import ChatContentHeader from "./ChatContentHeader";
import LoadingMessagesSkeleton from "./LoadingSkeleton/LoadingMessagesSkeleton";
import useMarkAsReadOnWindowFocus from "../../hooks/chat-messages/useMarkAsReadOnWindowFocus";
import NewMessagesBar from "./NewMessagesBar";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import useAuthUser from "../../hooks/auth/useAuthUser";
import { getMillisecondsDiff } from "../../utils/dates";
import { Message } from "../../gql/graphql";

const ChatContent = () => {
  const { channelId } = useParams();
  if (!channelId) return null;
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { data, loading, fetchMore } = useChatMessages(parseInt(channelId));
  const previousCursorRef = useRef(null);
  useLayoutEffect(() => {
    if (lastMessageRef.current) lastMessageRef.current.scrollIntoView();
  }, [data?.getMessages.cursor]);
  const { infiniteScrollDivRef, scrollContainerRef } = useChatInfiniteScroll(() => {
    if (!loading && data?.getMessages.cursor) {
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
    }
  });
  const bottomMessageListRef = useScrollChatBottom(data);
  const messages = useFragment(MESSAGE_INFO, data ? data.getMessages.messages : []);
  useMarkAsReadOnWindowFocus();

  const newMessagesRef = useRef<HTMLDivElement>(null);

  const { data: authUserData } = useAuthUser();
  if (!authUserData) return null;
  const { newMessagesNotifications } = authUserData.me;
  const unreadMessages = useMemo(
    () => newMessagesNotifications.filter((message) => message.channelId === parseInt(channelId!)),
    [newMessagesNotifications, channelId]
  );

  const [oldestUnreadMessage, setOldestUnreadMessage] = useState<Message | null>(null);
  if (!oldestUnreadMessage && unreadMessages.length > 0) {
    setOldestUnreadMessage(unreadMessages.reduce((prev, current) => (getMillisecondsDiff(prev.createdAt, current.createdAt) > 0 ? current : prev)));
  }

  return (
    <MessageReplyProvider>
      <ReplyScrollProvider>
        <main className="relative flex flex-col min-w-0 min-h-0 flex-auto">
          <div className="flex relative flex-auto min-h-0 min-w-0">
            {unreadMessages.length > 0 && <NewMessagesBar newMessagesRef={newMessagesRef} unreadMessages={unreadMessages} />}
            <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-scroll overflow-x-hidden min-h-0" style={{ overflowAnchor: "none" }}>
              {loading && messages.length === 0 && <LoadingMessagesSkeleton />}
              {data && (
                <ol className="flex flex-col min-h-0 overflow-hidden list-none justify-end items-stretch relative">
                  {!data.getMessages.cursor ? <ChatContentHeader /> : <LoadingMessagesSkeleton ref={infiniteScrollDivRef} />}
                  <ChatMessagesList
                    messages={messages}
                    oldestUnreadMessage={oldestUnreadMessage}
                    newMessagesRef={newMessagesRef}
                    lastMessageRef={lastMessageRef}
                    previousCursorRef={previousCursorRef}
                  />
                </ol>
              )}
              <div ref={bottomMessageListRef} className="h-[30px] w-[1px] pointer-events-none"></div>
            </div>
          </div>
          <ChatMessageInput key={channelId} />
        </main>
      </ReplyScrollProvider>
    </MessageReplyProvider>
  );
};

export default ChatContent;
