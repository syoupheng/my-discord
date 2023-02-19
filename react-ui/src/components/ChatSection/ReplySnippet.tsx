import { ReferencedMessage } from "../../gql/graphql";
import useAuthUser from "../../hooks/auth/useAuthUser";
import MessageItemProvider from "../../providers/MessageItemProvider";
import AvatarIconNoHole from "../Icons/AvatarIconNoHole";
import ReplyMessageContent from "./ReplyMessageContent";

interface Props {
  referencedMessage: ReferencedMessage;
}

const ReplySnippet = ({ referencedMessage }: Props) => {
  const { author, content } = referencedMessage;
  const { data } = useAuthUser();
  const { id: authUserId } = data?.me!;
  return (
    <div className="mb-1 flex items-center text-sm text-h-secondary leading-[1.125rem] relative whitespace-pre select-none before:content-[''] before:block before:absolute before:top-1/2 before:right-full before:bottom-0 before:left-[-36px] before:mr-1 before:mt-[-1px] before:ml-[-1px] before:border-l-2 before:border-l-primary-dark-550 before:border-b-0 before:border-r-0 before:border-t-2 before:border-t-primary-dark-550 before:rounded-tl-md">
      <div className="basis-auto shrink-0 grow-0 select-none mr-1">
        <AvatarIconNoHole size={16} />
      </div>
      <span className="shrink-0 mr-1 opacity-[0.64] text-white font-medium inline relative overflow-hidden hover:underline cursor-pointer">
        {author.id !== authUserId && "@"}
        {author.username}
      </span>
      <MessageItemProvider message={referencedMessage}>
        <ReplyMessageContent content={content} />
      </MessageItemProvider>
    </div>
  );
};

export default ReplySnippet;
