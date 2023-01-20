import { useContext } from "react";
import { ClickedReplyContext } from "../../providers/ClickedReplyProvider";

const useScrollReplyContext = () => {
  const context = useContext(ClickedReplyContext);
  if (context === null) throw new Error("useScrollReplyContext must be used inside of a ReplyScrollProvider !");
  return context;
};

export default useScrollReplyContext;
