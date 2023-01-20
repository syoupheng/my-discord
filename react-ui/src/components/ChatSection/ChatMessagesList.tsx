import { Fragment } from "react";
import { MessageInfoFragment } from "../../gql/graphql";
import useMessageReply from "../../hooks/chat-messages/useMessageReply";
import useScrollReplyContext from "../../hooks/chat-messages/useScrollToReply";
import { formatToDayMonthYear, isMessageConsecutive } from "../../utils/dates";
import MessageDivider from "./MessageDivider";
import MessageItem from "./MessageItem";

interface Props {
  messages: readonly MessageInfoFragment[];
}

const ChatMessagesList = ({ messages }: Props) => {
  const { replyMessageId, replyMessageRef } = useMessageReply()!;
  const { clickedReplyId, clickedReplyRef } = useScrollReplyContext();
  return (
    <>
      {messages.map((msg, idx) => (
        <Fragment key={msg.id}>
          {idx === 0 || formatToDayMonthYear(msg.createdAt) !== formatToDayMonthYear(messages[idx - 1].createdAt) ? (
            <MessageDivider date={formatToDayMonthYear(msg.createdAt)} />
          ) : null}
          <MessageItem
            ref={msg.id === clickedReplyId ? clickedReplyRef : msg.id === replyMessageId ? replyMessageRef : null}
            msg={msg}
            isRepliedTo={msg.id === replyMessageId}
            isConsecutive={idx > 0 && isMessageConsecutive(msg, messages[idx - 1]) && !msg.referencedMessage}
          />
        </Fragment>
      ))}
    </>
  );
};

export default ChatMessagesList;
