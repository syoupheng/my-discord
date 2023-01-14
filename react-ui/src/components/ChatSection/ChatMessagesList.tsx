import { Fragment } from "react";
import { MessageInfoFragment } from "../../gql/graphql";
import { formatToDayMonthYear, isMessageConsecutive } from "../../utils/dates";
import MessageDivider from "./MessageDivider";
import MessageItem from "./MessageItem";

interface Props {
  messages: readonly MessageInfoFragment[];
}

const ChatMessagesList = ({ messages }: Props) => {
  return (
    <>
      {messages.map((msg, idx) => (
        <Fragment key={msg.id}>
          {idx === 0 || formatToDayMonthYear(msg.createdAt) !== formatToDayMonthYear(messages[idx - 1].createdAt) ? (
            <MessageDivider date={formatToDayMonthYear(msg.createdAt)} />
          ) : null}
          <MessageItem msg={msg} isConsecutive={idx > 0 && isMessageConsecutive(msg, messages[idx - 1])} />
        </Fragment>
      ))}
    </>
  );
};

export default ChatMessagesList;
