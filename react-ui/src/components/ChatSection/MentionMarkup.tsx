import { useParams } from "react-router-dom";
import useMessageContext from "../../hooks/chat-messages/useMessageContext";

interface Props {
  mentionId: number;
}

const MentionMarkup = ({ mentionId }: Props) => {
  const message = useMessageContext();
  const { channelId } = useParams();
  if (!message || !channelId) return null;
  const mention = message.mentions.find((mention) => mention.id === mentionId);
  if (!mention) return null;
  return (
    <span className="rounded-[3px] px-[2px] cursor-pointer text-brand-260 bg-mention-bg font-medium hover:bg-blue hover:text-white transition-colors">
      @{mention.username}
    </span>
  );
};

export default MentionMarkup;
