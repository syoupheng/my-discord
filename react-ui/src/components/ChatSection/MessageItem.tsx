import { forwardRef } from "react";
import { CHANNEL_MEMBER_FIELDS } from "../../fragments/messages";
import { useFragment } from "../../gql";
import { ChannelMember, Message, MessageInfoFragment } from "../../gql/graphql";
import useIsMentioned from "../../hooks/chat-messages/useIsMentioned";
import MessageItemProvider from "../../providers/MessageItemProvider";
import { formatMessageDate } from "../../utils/dates";
import AvatarIconNoHole from "../Icons/AvatarIconNoHole";
import ButtonContainer from "./MessageButtons/ButtonContainer";
import ConsecutiveMessageTimestamp from "./ConsecutiveMessageTimestamp";
import MessageContent from "./MessageContent";
import ReplySnippet from "./ReplySnippet";

interface Props {
  msg: MessageInfoFragment;
  isConsecutive?: boolean;
  isRepliedTo?: boolean;
}

const MessageItem = forwardRef<HTMLDivElement, Props>(({ msg, isConsecutive = false, isRepliedTo = false }, ref) => {
  const { createdAt } = msg;
  const mentions = useFragment(CHANNEL_MEMBER_FIELDS, msg.mentions);
  const author = useFragment(CHANNEL_MEMBER_FIELDS, msg.author);
  const refMessageAuthor = useFragment(CHANNEL_MEMBER_FIELDS, msg.referencedMessage?.author);
  const refMessageMentions = useFragment(CHANNEL_MEMBER_FIELDS, msg.referencedMessage?.mentions);
  const isMentioned = useIsMentioned(mentions);
  const formattedDate = formatMessageDate(createdAt);
  return (
    <MessageItemProvider message={msg as Message}>
      <li className="outline-none relative">
        <div
          ref={ref}
          className={`${
            isRepliedTo
              ? " bg-message-highlight before:bg-blue before:content-[''] before:absolute before:block before:top-0 before:left-0 before:bottom-0 before:pointer-events-none before:w-[2px] hover:bg-message-highlight-hov"
              : isMentioned
              ? "bg-yellow-mentioned before:bg-status-yellow-500 before:content-[''] before:absolute before:block before:top-0 before:left-0 before:bottom-0 before:pointer-events-none before:w-[2px] hover:bg-yellow-mentioned-hov"
              : "hover:bg-message-hov"
          } ${!isConsecutive ? "mt-[1.0625rem] min-h-[2.75rem]" : ""} pl-[72px] py-[0.125rem] pr-12 relative select-text group`}
          style={{ wordWrap: "break-word" }}
        >
          {msg.referencedMessage && (
            <ReplySnippet
              referencedMessage={{
                ...msg.referencedMessage,
                author: refMessageAuthor as ChannelMember,
                mentions: refMessageMentions as ChannelMember[],
              }}
            />
          )}
          <div className="indent-0">
            {isConsecutive ? (
              <ConsecutiveMessageTimestamp timestamp={createdAt} />
            ) : (
              <>
                <div
                  className="absolute pointer-events-auto left-4 overflow-hidden cursor-pointer select-none"
                  style={{ marginTop: "calc(4px - 0.125rem)" }}
                >
                  <AvatarIconNoHole bgColor={author.avatarColor} size={40} />
                </div>
                <h3 className="overflow-hidden block relative leading-[1.375rem] min-h-[1.375rem] text-muted" style={{ whiteSpace: "break-spaces" }}>
                  <span className="mr-[0.25rem] text-btw-base-sm font-medium leading-[1.375rem] overflow-hidden relative align-baseline text-white hover:underline cursor-pointer">
                    {author.username}
                  </span>
                  <span className="text-xs leading-[1.375rem] align-baseline ml-[0.25rem] inline-block h-5 cursor-default pointer-events-none font-normal">
                    <time dateTime={createdAt}>{formattedDate}</time>
                  </span>
                </h3>
              </>
            )}
            <MessageContent messageContent={msg.content} />
          </div>
          <ButtonContainer isConsecutive={isConsecutive} />
        </div>
      </li>
    </MessageItemProvider>
  );
});

export default MessageItem;
