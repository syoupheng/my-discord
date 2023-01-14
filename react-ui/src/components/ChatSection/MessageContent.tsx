import { MessageInfoFragment } from "../../gql/graphql";
import LinkRenderer from "./LinkRenderer";

interface Props {
  message: MessageInfoFragment;
}

const MessageContent = ({ message }: Props) => {
  return (
    <div
      className="select-text ml-[-72px] pl-[72px] overflow-hidden indent-0 text-btw-base-sm leading-[1.375rem] text-secondary-light"
      style={{ whiteSpace: "break-spaces", wordWrap: "break-word" }}
    >
      <LinkRenderer content={message.content} />
    </div>
  );
};

export default MessageContent;
