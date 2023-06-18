import ConsecutiveMessageTimestamp from "@/components/ChatSection/ConsecutiveMessageTimestamp";
import ButtonContainer from "@/components/ChatSection/MessageButtons/ButtonContainer";
import MessageContent from "@/components/ChatSection/MessageContent";
import ReplySnippet from "@/components/ChatSection/ReplySnippet";
import AvatarIconNoHole from "@/components/Icons/AvatarIconNoHole";
import TooltipWrapper from "@/components/shared/TooltipWrapper";
import { MessageFragment } from "@/gql/graphql";
import useIsMentioned from "@/hooks/chat-messages/useIsMentioned";
import MessageItemProvider from "@/providers/MessageItemProvider";
import { formatMessageDate } from "@/utils/dates";
import { forwardRef } from "react";

type Props = {
  msg: MessageFragment;
  isConsecutive?: boolean;
  isRepliedTo?: boolean;
};

const MessageItem = forwardRef<HTMLDivElement, Props>(({ msg, isConsecutive = false, isRepliedTo = false }, ref) => {
  const { createdAt, mentions, author, referencedMessage } = msg;
  const isMentioned = useIsMentioned(mentions);
  const isOptimisticResponse = typeof msg.id === "string" && msg.id === "temp-id";
  return (
    <MessageItemProvider message={msg}>
      <li className="outline-none relative">
        <div
          ref={ref}
          className={`${
            !isOptimisticResponse
              ? isRepliedTo
                ? " bg-message-highlight before:bg-blue before:content-[''] before:absolute before:block before:top-0 before:left-0 before:bottom-0 before:pointer-events-none before:w-[2px] hover:bg-message-highlight-hov"
                : isMentioned
                ? "bg-yellow-mentioned before:bg-status-yellow-500 before:content-[''] before:absolute before:block before:top-0 before:left-0 before:bottom-0 before:pointer-events-none before:w-[2px] hover:bg-yellow-mentioned-hov"
                : "hover:bg-message-hov"
              : ""
          } ${!isConsecutive ? "mt-[1.0625rem] min-h-[2.75rem]" : ""} ${
            isOptimisticResponse ? "opacity-40" : ""
          } pl-[72px] py-[0.125rem] pr-12 relative select-text group`}
          style={{ wordWrap: "break-word" }}
        >
          {msg.referencedMessage && <ReplySnippet referencedMessage={referencedMessage} />}
          <div className="indent-0">
            {isConsecutive ? (
              <ConsecutiveMessageTimestamp timestamp={createdAt} />
            ) : (
              <>
                <TooltipWrapper
                  tooltipTxt={`${author.username}#${author.discriminator}`}
                  showOnClick
                  className="absolute pointer-events-auto left-4 overflow-hidden cursor-pointer select-none"
                  style={{ marginTop: "calc(4px - 0.125rem)" }}
                >
                  <AvatarIconNoHole bgColor={author.avatarColor} size={40} />
                </TooltipWrapper>
                <h3 className="overflow-hidden block relative leading-[1.375rem] min-h-[1.375rem] text-muted" style={{ whiteSpace: "break-spaces" }}>
                  <TooltipWrapper
                    tooltipTxt={`${author.username}#${author.discriminator}`}
                    showOnClick
                    className="inline mr-[0.25rem] text-btw-base-sm font-medium leading-[1.375rem] overflow-hidden relative align-baseline text-white hover:underline cursor-pointer"
                  >
                    {author.username}
                  </TooltipWrapper>
                  <span className="text-xs leading-[1.375rem] align-baseline ml-[0.25rem] inline-block h-5 cursor-default pointer-events-none font-normal">
                    <time dateTime={createdAt}>{formatMessageDate(createdAt)}</time>
                  </span>
                </h3>
              </>
            )}
            <MessageContent messageContent={msg.content} />
          </div>
          {!isOptimisticResponse && <ButtonContainer isConsecutive={isConsecutive} />}
        </div>
      </li>
    </MessageItemProvider>
  );
});

export default MessageItem;
