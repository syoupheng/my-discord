import { MessageFragment } from "@/gql/graphql";
import { ReferencedMessageFragment } from "@/types/channel";
import { createContext, PropsWithChildren } from "react";

type MessageContextValue = MessageFragment | NonNullable<ReferencedMessageFragment>;
export const MessageItemContext = createContext<MessageContextValue | null>(null);

type Props = PropsWithChildren & {
  message: MessageContextValue;
};

const MessageItemProvider = ({ children, message }: Props) => {
  return <MessageItemContext.Provider value={message}>{children}</MessageItemContext.Provider>;
};

export default MessageItemProvider;
