import useSafeContext from "@/hooks/shared/useSafeContext";
import { PropsWithChildren, createContext, useRef } from "react";

type MessageItemScrollContextValue = {
  scrollToId: (messageId: number, scrollOptions?: ScrollIntoViewOptions) => void;
  getRefsMap: () => Map<number, HTMLDivElement>;
};

const messageItemScrollContext = createContext<MessageItemScrollContextValue | null>(null);

const MessageItemScrollProvider = ({ children }: PropsWithChildren) => {
  const messagesItemsRefs = useRef<Map<number, HTMLDivElement> | null>(null);

  const getRefsMap = () => {
    if (!messagesItemsRefs.current) messagesItemsRefs.current = new Map();
    return messagesItemsRefs.current;
  };

  const scrollToId = (messageId: number, scrollOptions?: ScrollIntoViewOptions) => {
    const refsMap = getRefsMap();
    const messageItem = refsMap.get(messageId);
    if (messageItem) {
      messageItem.scrollIntoView(scrollOptions);
    }
  };

  return <messageItemScrollContext.Provider value={{ scrollToId, getRefsMap }}>{children}</messageItemScrollContext.Provider>;
};

export const useMessageItemScrollContext = () => {
  return useSafeContext(messageItemScrollContext, "useMessageItemScrollContext must be called inside MessageItemScrollProvider !");
};

export default MessageItemScrollProvider;
