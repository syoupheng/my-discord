import { Fragment } from "react";
import { useParams } from "react-router-dom";
import useChatMessages from "../../hooks/chat-messages/useChatMessages";
import { formatToDayMonthYear, getMinutesDiff, isMessageConsecutive } from "../../utils/dates";
import ChatMessageInput from "./ChatMessageInput";
import MessageDivider from "./MessageDivider";
import MessageItem from "./MessageItem";

const ChatContent = () => {
  const { channelId } = useParams();
  if (!channelId) return null;
  const { data, loading } = useChatMessages(parseInt(channelId));
  if (loading) return <div>Loading...</div>;
  if (!data) return null;
  const { messages } = data;
  return (
    <main className="relative flex flex-col min-w-0 min-h-0 flex-auto">
      <div className="flex relative flex-auto min-h-0 min-w-0">
        <div className="absolute inset-0 overflow-y-scroll overflow-x-hidden min-h-0" style={{ overflowAnchor: "none" }}>
          <ol className="flex flex-col min-h-0 overflow-hidden list-none justify-end items-stretch relative">
            {messages.map((msg, idx: number) => {
              return (
                <Fragment key={msg.id}>
                  {idx === 0 || formatToDayMonthYear(msg.createdAt) !== formatToDayMonthYear(messages[idx - 1].createdAt) ? (
                    <MessageDivider date={formatToDayMonthYear(msg.createdAt)} />
                  ) : null}
                  <MessageItem msg={msg} isConsecutive={idx > 0 && isMessageConsecutive(msg, messages[idx - 1])} />
                </Fragment>
              );
            })}
            <div className="h-[30px] w-[1px] pointer-events-none"></div>
          </ol>
        </div>
      </div>
      <ChatMessageInput />
    </main>
  );
};

export default ChatContent;
