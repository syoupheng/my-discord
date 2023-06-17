import ReplyMessageContent from "@/components/ChatSection/ReplyMessageContent";
import AvatarIconNoHole from "@/components/Icons/AvatarIconNoHole";
import TooltipWrapper from "@/components/shared/TooltipWrapper";
import useAuthUserInfo from "@/hooks/auth/useAuthUserInfo";
import MessageItemProvider from "@/providers/MessageItemProvider";
import { ReferencedMessageFragment } from "@/types/channel";

type Props = {
  referencedMessage: ReferencedMessageFragment;
};

const ReplySnippet = ({ referencedMessage }: Props) => {
  const { id: authUserId } = useAuthUserInfo();
  if (!referencedMessage) return null;
  const { author, content } = referencedMessage;
  return (
    <div className="mb-1 flex items-center text-sm text-h-secondary leading-[1.125rem] relative whitespace-pre select-none before:content-[''] before:block before:absolute before:top-1/2 before:right-full before:bottom-0 before:left-[-36px] before:mr-1 before:mt-[-1px] before:ml-[-1px] before:border-l-2 before:border-l-primary-dark-550 before:border-b-0 before:border-r-0 before:border-t-2 before:border-t-primary-dark-550 before:rounded-tl-md">
      <div className="basis-auto shrink-0 grow-0 select-none mr-1">
        <AvatarIconNoHole bgColor={author.avatarColor} size={16} />
      </div>
      <TooltipWrapper
        tooltipTxt={`${author.username}#${author.discriminator}`}
        showOnClick
        className="shrink-0 mr-1 opacity-[0.64] text-white font-medium inline relative overflow-hidden hover:underline cursor-pointer"
      >
        {author.id !== authUserId && "@"}
        {author.username}
      </TooltipWrapper>
      <MessageItemProvider message={referencedMessage}>
        <ReplyMessageContent content={content} />
      </MessageItemProvider>
    </div>
  );
};

export default ReplySnippet;
