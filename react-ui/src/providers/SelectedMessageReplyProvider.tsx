import { createContext, ReactNode, RefObject, useRef, useState } from "react";

interface TReplyMessageContext {
  replyMessageId: number | null;
  setReplyMessageId: (id: number | null) => void;
}

export const SelectedMessageReplyContext = createContext<TReplyMessageContext | null>(null);

interface Props {
  children: ReactNode;
}

const SelectedMessageReplyProvider = ({ children }: Props) => {
  const [replyMessageId, setReplyMessageId] = useState<number | null>(null);
  return <SelectedMessageReplyContext.Provider value={{ replyMessageId, setReplyMessageId }}>{children}</SelectedMessageReplyContext.Provider>;
};

export default SelectedMessageReplyProvider;
