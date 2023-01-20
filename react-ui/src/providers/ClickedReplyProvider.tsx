import { createContext, ReactNode, RefObject, useEffect, useRef, useState } from "react";

interface TReplyMessageContext {
  clickedReplyId: number | null;
  setClickedReplyId: (id: number | null) => void;
  clickedReplyRef: RefObject<HTMLDivElement>;
}

export const ClickedReplyContext = createContext<TReplyMessageContext | null>(null);

interface Props {
  children: ReactNode;
}

const ClickedReplyProvider = ({ children }: Props) => {
  const [clickedReplyId, setClickedReplyId] = useState<number | null>(null);
  const clickedReplyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (clickedReplyRef) clickedReplyRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setClickedReplyId(null);
  }, [clickedReplyId, clickedReplyRef.current]);
  return <ClickedReplyContext.Provider value={{ clickedReplyId, setClickedReplyId, clickedReplyRef }}>{children}</ClickedReplyContext.Provider>;
};

export default ClickedReplyProvider;
