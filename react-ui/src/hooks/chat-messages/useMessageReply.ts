import { useContext } from "react";
import { SelectedMessageReplyContext } from "../../providers/SelectedMessageReplyProvider";

const useSelectedMessageReply = () => {
  const context = useContext(SelectedMessageReplyContext);
  if (context === null) throw new Error("useMessageReply must be used inside of MessageReplyProvider !");
  return context;
};

export default useSelectedMessageReply;
