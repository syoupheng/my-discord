import useMessageContext from "../../hooks/chat-messages/useMessageContext";
import { useMessageItemScrollContext } from "../../providers/MessageItemScrollProvider";
import MessageContent from "./MessageContent";

interface Props {
  content: string;
}

const ReplyMessageContent = ({ content }: Props) => {
  const { id } = useMessageContext();
  const { scrollToId } = useMessageItemScrollContext();
  return (
    <div
      onClick={() => scrollToId(id, { behavior: "smooth", block: "center" })}
      className="cursor-pointer flex-initial overflow-hidden hover:text-secondary-light"
    >
      <MessageContent messageContent={content} type="reply" />
    </div>
  );
};

export default ReplyMessageContent;
