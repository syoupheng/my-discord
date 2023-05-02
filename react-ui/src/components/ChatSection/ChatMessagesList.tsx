import { Fragment, RefObject } from "react";
import { Message, MessageInfoFragment } from "../../gql/graphql";
import useMessageReply from "../../hooks/chat-messages/useMessageReply";
import { formatToDayMonthYear, isMessageConsecutive } from "../../utils/dates";
import MessageDivider from "./MessageDivider";
import MessageItem from "./MessageItem";
import NewMesaggesDivider from "./NewMessagesDivider";
import { useMessageItemScrollContext } from "../../providers/MessageItemScrollProvider";

interface Props {
  messages: readonly MessageInfoFragment[];
  oldestUnreadMessage: Message | null;
  newMessagesRef: RefObject<HTMLDivElement>;
  lastMessageRef: RefObject<HTMLDivElement>;
  previousCursorRef: RefObject<string>;
}

const ChatMessagesList = ({ messages, oldestUnreadMessage, newMessagesRef, lastMessageRef, previousCursorRef }: Props) => {
  const { replyMessageId } = useMessageReply()!;
  const isOldestUnreadMessage = (msg: MessageInfoFragment) => !!oldestUnreadMessage && oldestUnreadMessage.id === msg.id;
  const isNextDay = (prevMsg: MessageInfoFragment, nextMsg: MessageInfoFragment) => {
    if (!nextMsg) return false;
    return formatToDayMonthYear(nextMsg.createdAt) !== formatToDayMonthYear(prevMsg.createdAt);
  };

  const { getRefsMap } = useMessageItemScrollContext();
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
            ref={(node: HTMLDivElement) => {
              const refsMap = getRefsMap();
              if (node) {
                refsMap.set(msg.id, node);
              } else refsMap.delete(msg.id);
            }}
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
