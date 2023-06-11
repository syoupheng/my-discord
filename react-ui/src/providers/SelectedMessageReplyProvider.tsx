import { createContext, PropsWithChildren, useState } from "react";

type ReplyMessageContext = {
  replyMessageId: number | null;
  setReplyMessageId: (id: number | null) => void;
};

export const SelectedMessageReplyContext = createContext<ReplyMessageContext | null>(null);

const SelectedMessageReplyProvider = ({ children }: PropsWithChildren) => {
  const [replyMessageId, setReplyMessageId] = useState<number | null>(null);
  return <SelectedMessageReplyContext.Provider value={{ replyMessageId, setReplyMessageId }}>{children}</SelectedMessageReplyContext.Provider>;
};

export default SelectedMessageReplyProvider;
