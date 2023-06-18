import MessageButton from "@/components/ChatSection/MessageButtons/MessageButton";
import MessageResponseIcon from "@/components/Icons/MessageResponseIcon";
import useMessageContext from "@/hooks/chat-messages/useMessageContext";
import useMessageReply from "@/hooks/chat-messages/useMessageReply";

const MessageRespondButton = () => {
  const message = useMessageContext();
  const { setReplyMessageId } = useMessageReply();
  const handleClick = () => {
    if (message) setReplyMessageId(message.id);
  };
  return (
    <MessageButton label="Répondre" action={handleClick}>
      <MessageResponseIcon size={20} />
    </MessageButton>
  );
};

export default MessageRespondButton;
