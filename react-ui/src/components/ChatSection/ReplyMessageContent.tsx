import useMessageContext from "../../hooks/chat-messages/useMessageContext";
import useScrollReplyContext from "../../hooks/chat-messages/useScrollToReply";
import MessageContent from "./MessageContent";

interface Props {
  content: string;
}

const ReplyMessageContent = ({ content }: Props) => {
  const { setClickedReplyId } = useScrollReplyContext();
  const { id } = useMessageContext();
  return (
    <div onClick={() => setClickedReplyId(id)} className="cursor-pointer flex-initial overflow-hidden hover:text-secondary-light">
      <MessageContent messageContent={content} type="reply" />
    </div>
  );
};

export default ReplyMessageContent;
