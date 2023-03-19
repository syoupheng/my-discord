import { Fragment, RefObject } from "react";
import { Message, MessageInfoFragment } from "../../gql/graphql";
import useMessageReply from "../../hooks/chat-messages/useMessageReply";
import useScrollReplyContext from "../../hooks/chat-messages/useScrollToReply";
import { formatToDayMonthYear, isMessageConsecutive } from "../../utils/dates";
import MessageDivider from "./MessageDivider";
import MessageItem from "./MessageItem";
import NewMesaggesDivider from "./NewMessagesDivider";

interface Props {
  messages: readonly MessageInfoFragment[];
  oldestUnreadMessage: Message | null;
  newMessagesRef: RefObject<HTMLDivElement>;
  lastMessageRef: RefObject<HTMLDivElement>;
  previousCursorRef: RefObject<string>;
}

const ChatMessagesList = ({ messages, oldestUnreadMessage, newMessagesRef, lastMessageRef, previousCursorRef }: Props) => {
  const { replyMessageId, replyMessageRef } = useMessageReply()!;
  const { clickedReplyId, clickedReplyRef } = useScrollReplyContext();
  const isOldestUnreadMessage = (msg: MessageInfoFragment) => !!oldestUnreadMessage && oldestUnreadMessage.id === msg.id;
  const isNextDay = (prevMsg: MessageInfoFragment, nextMsg: MessageInfoFragment) =>
    formatToDayMonthYear(nextMsg.createdAt) !== formatToDayMonthYear(prevMsg.createdAt);
  return (
    <>
      {messages.map((msg, idx) => (
        <Fragment key={msg.id}>
          {isOldestUnreadMessage(msg) ? (
            <NewMesaggesDivider ref={newMessagesRef} date={isNextDay(msg, messages[idx - 1]) ? formatToDayMonthYear(msg.createdAt) : null} />
          ) : idx === 0 || isNextDay(msg, messages[idx - 1]) ? (
            <MessageDivider date={formatToDayMonthYear(msg.createdAt)} />
          ) : null}
          <MessageItem
            ref={
              msg.createdAt === previousCursorRef.current
                ? lastMessageRef
                : msg.id === clickedReplyId
                ? clickedReplyRef
                : msg.id === replyMessageId
                ? replyMessageRef
                : null
            }
            msg={msg}
            isRepliedTo={msg.id === replyMessageId}
            isConsecutive={idx > 0 && isMessageConsecutive(msg, messages[idx - 1]) && !msg.referencedMessage && !isOldestUnreadMessage(msg)}
          />
        </Fragment>
      ))}
    </>
  );
};

export default ChatMessagesList;
