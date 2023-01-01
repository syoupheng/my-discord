import { createContext, ReactNode } from "react";

export const MessageItemContext = createContext<number | null>(null);

interface Props {
  children: ReactNode;
  messageId: number;
}

const MessageItemProvider = ({ children, messageId }: Props) => {
  return <MessageItemContext.Provider value={messageId}>{children}</MessageItemContext.Provider>;
};

export default MessageItemProvider;
