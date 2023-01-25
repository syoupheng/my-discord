import { NetworkStatus } from "@apollo/client";
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
import GroupChatContentHeader from "./GroupChatContentHeader";
import LoadingMessagesSkeleton from "./LoadingSkeleton/LoadingMessagesSkeleton";

const ChatContent = () => {
  const { channelId } = useParams();
  if (!channelId) return null;
  const { data, loading, fetchMore, networkStatus } = useChatMessages(parseInt(channelId));
  const { infiniteScrollDivRef, scrollContainerRef } = useChatInfiniteScroll(() => {
    if (!loading && networkStatus !== NetworkStatus.loading && data?.getMessages.cursor) {
      fetchMore({
        variables: { cursor: data?.getMessages.cursor, limit: MESSAGES_LIMIT },
        updateQuery: (previousResults, { fetchMoreResult }) => {
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
  return (
    <MessageReplyProvider>
      <ReplyScrollProvider>
        <main className="relative flex flex-col min-w-0 min-h-0 flex-auto">
          <div className="flex relative flex-auto min-h-0 min-w-0">
            <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-scroll overflow-x-hidden min-h-0" style={{ overflowAnchor: "none" }}>
              {loading && messages.length === 0 && <LoadingMessagesSkeleton />}
              {data && (
                <ol className="flex flex-col min-h-0 overflow-hidden list-none justify-end items-stretch relative">
                  {!data.getMessages.cursor ? <GroupChatContentHeader /> : <LoadingMessagesSkeleton ref={infiniteScrollDivRef} />}
                  <ChatMessagesList messages={messages} />
                </ol>
              )}
              <div ref={bottomMessageListRef} className="h-[30px] w-[1px] pointer-events-none"></div>
            </div>
          </div>
          <ChatMessageInput />
        </main>
      </ReplyScrollProvider>
    </MessageReplyProvider>
  );
};

export default ChatContent;
