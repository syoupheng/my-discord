import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CHANNEL_MEMBER_FIELDS, MESSAGE_INFO } from "../../fragments/messages";
import { useFragment } from "../../gql";
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
  const messages = useFragment(MESSAGE_INFO, data ? data.getMessages.messages : []);
  const message = messages.find(({ id }) => messageId === id);
  if (!message) return null;
  const mention = useFragment(CHANNEL_MEMBER_FIELDS, message.mentions).find((mention) => mention.id === mentionId);
  if (!mention) return null;
  return (
    <span className="rounded-[3px] px-[2px] cursor-pointer text-brand-260 bg-mention-bg font-medium hover:bg-blue hover:text-white transition-colors">
      @{mention.username}
    </span>
  );
};

export default MentionMarkup;
