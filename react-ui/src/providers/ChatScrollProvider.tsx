import { createContext, PropsWithChildren, RefObject, useRef } from "react";

export const ChatScrollContext = createContext<RefObject<HTMLDivElement> | null>(null);

const ChatScrollProvider = ({ children }: PropsWithChildren) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  return <ChatScrollContext.Provider value={scrollContainerRef}>{children}</ChatScrollContext.Provider>;
};

export default ChatScrollProvider;
