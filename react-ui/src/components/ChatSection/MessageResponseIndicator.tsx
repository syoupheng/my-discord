import { CHANNEL_MEMBER_FIELDS } from "../../fragments/messages";
import { useFragment } from "../../gql";
import useGetChannelMessages from "../../hooks/chat-messages/useGetChannelMessages";
import useMessageReply from "../../hooks/chat-messages/useMessageReply";
import { useMessageItemScrollContext } from "../../providers/MessageItemScrollProvider";
import RoundCloseIcon from "../Icons/RoundCloseIcon";

const MessageResponseIndicator = () => {
  const { replyMessageId, setReplyMessageId } = useMessageReply()!;
  const { scrollToId } = useMessageItemScrollContext();
  const messages = useGetChannelMessages();
  if (!replyMessageId) return null;
  const replyMessage = messages.find(({ id }) => replyMessageId === id);
  if (!replyMessage) return null;
  const replyAuthor = useFragment(CHANNEL_MEMBER_FIELDS, replyMessage.author);
  return (
    <div className="bg-secondary rounded-lg">
      <div className="overflow-hidden pt-[3px] mt-[-3px]">
        <div className="flex items-center cursor-pointer h-8">
          <div
            onClick={() => scrollToId(replyMessageId, { behavior: "smooth", block: "center" })}
            className="text-h-secondary flex-auto overflow-hidden whitespace-nowrap text-ellipsis ml-4 text-sm leading-[18px]"
          >
            Répondre à <span className="font-semibold">{replyAuthor.username}</span>
          </div>
          <div className="flex items-center basis-auto grow-0 shrink-0">
            <div
              onClick={() => setReplyMessageId!(null)}
              className="basis-auto grow-0 shrink-0 cursor-pointer text-h-secondary hover:text-secondary-light pr-[18px] py-2 pl-4"
            >
              <RoundCloseIcon size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageResponseIndicator;
