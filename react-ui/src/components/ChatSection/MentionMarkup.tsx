import { useContext } from "react";
import { useParams } from "react-router-dom";
import useChatMessages from "../../hooks/chat-messages/useChatMessages";
import { MessageItemContext } from "../../providers/MessageItemProvider";

interface Props {
  mentionId: number;
}

const MentionMarkup = ({ mentionId }: Props) => {
  const messageId = useContext(MessageItemContext);
  const { channelId } = useParams();
  if (!messageId || !channelId) return null;
  const { data } = useChatMessages(parseInt(channelId));
  if (!data) return null;
  const message = data.messages.find(({ id }) => messageId === id);
  if (!message) return null;
  const mention = message.mentions.find((mention) => mention.id === mentionId);
  if (!mention) return null;
  return (
    <span className="rounded-[3px] px-[2px] cursor-pointer text-brand-260 bg-mention-bg font-medium hover:bg-blue hover:text-white transition-colors">
      @{mention.username}
    </span>
  );
};

export default MentionMarkup;
