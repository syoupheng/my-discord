import { createContext, ReactNode, RefObject, useRef } from "react";

export const ChatScrollContext = createContext<RefObject<HTMLDivElement> | null>(null);

interface Props {
  children: ReactNode;
}

const ChatScrollProvider = ({ children }: Props) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  return <ChatScrollContext.Provider value={scrollContainerRef}>{children}</ChatScrollContext.Provider>;
};

export default ChatScrollProvider;
