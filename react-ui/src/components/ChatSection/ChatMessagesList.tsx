import MessageDivider from "@/components/ChatSection/MessageDivider";
import MessageItem from "@/components/ChatSection/MessageItem";
import NewMesaggesDivider from "@/components/ChatSection/NewMessagesDivider";
import { MessageFragment, MessageNotificationFragment } from "@/gql/graphql";
import useMessageReply from "@/hooks/chat-messages/useMessageReply";
import { useMessageItemScrollContext } from "@/providers/MessageItemScrollProvider";
import { formatToDayMonthYear, isMessageConsecutive } from "@/utils/dates";
import { Fragment, RefObject } from "react";

type Props = {
  messages: MessageFragment[];
  oldestUnreadMessage: MessageNotificationFragment | null;
  newMessagesRef: RefObject<HTMLDivElement>;
};

const ChatMessagesList = ({ messages, oldestUnreadMessage, newMessagesRef }: Props) => {
  const { replyMessageId } = useMessageReply();
  const isOldestUnreadMessage = (msg: MessageFragment) => !!oldestUnreadMessage && oldestUnreadMessage.id === msg.id;
  const isNextDay = (prevMsg: MessageFragment, nextMsg: MessageFragment) => {
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
