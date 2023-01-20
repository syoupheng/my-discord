import { createContext, ReactNode } from "react";
import { Message, ReferencedMessage } from "../gql/graphql";

type MessageContextValue = Message | ReferencedMessage;
export const MessageItemContext = createContext<MessageContextValue | null>(null);

interface Props {
  children: ReactNode;
  message: MessageContextValue;
}

const MessageItemProvider = ({ children, message }: Props) => {
  return <MessageItemContext.Provider value={message}>{children}</MessageItemContext.Provider>;
};

export default MessageItemProvider;
