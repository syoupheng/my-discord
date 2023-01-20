import { MessageInfoFragment } from "../../gql/graphql";
import LinkRenderer from "./LinkRenderer";

type MessageContentType = "reply" | "normal";

interface Props {
  messageContent: string;
  type?: MessageContentType;
}

const stylesMapping = new Map<MessageContentType, { classes: string; styles: any }>([
  [
    "normal",
    {
      classes: "select-text text-btw-base-sm leading-[1.375rem] text-secondary-light",
      styles: { whiteSpace: "break-spaces", wordWrap: "break-word" },
    },
  ],
  [
    "reply",
    {
      classes: "whitespace-nowrap text-ellipsis pointer-events-none select-none relative w-full",
      styles: { inlineSize: "max-content", wordWrap: "break-word" },
    },
  ],
]);

const MessageContent = ({ messageContent, type = "normal" }: Props) => {
  return (
    <div className={`${stylesMapping.get(type)?.classes} ml-[-72px] pl-[72px] overflow-hidden indent-0`} style={stylesMapping.get(type)?.styles}>
      <LinkRenderer content={messageContent} />
    </div>
  );
};

export default MessageContent;
