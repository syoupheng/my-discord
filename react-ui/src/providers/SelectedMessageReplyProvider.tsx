import { createContext, ReactNode, RefObject, useRef, useState } from "react";

interface TReplyMessageContext {
  replyMessageId: number | null;
  setReplyMessageId: (id: number | null) => void;
  replyMessageRef: RefObject<HTMLDivElement>;
}

export const SelectedMessageReplyContext = createContext<TReplyMessageContext | null>(null);

interface Props {
  children: ReactNode;
}

const SelectedMessageReplyProvider = ({ children }: Props) => {
  const [replyMessageId, setReplyMessageId] = useState<number | null>(null);
  const replyMessageRef = useRef<HTMLDivElement>(null);
  return (
    <SelectedMessageReplyContext.Provider value={{ replyMessageId, setReplyMessageId, replyMessageRef }}>
      {children}
    </SelectedMessageReplyContext.Provider>
  );
};

export default SelectedMessageReplyProvider;
