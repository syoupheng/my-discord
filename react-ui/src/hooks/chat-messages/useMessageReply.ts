import { SelectedMessageReplyContext } from "../../providers/SelectedMessageReplyProvider";
import useSafeContext from "../shared/useSafeContext";

const useSelectedMessageReply = () => useSafeContext(SelectedMessageReplyContext, "useMessageReply must be used inside of MessageReplyProvider !");

export default useSelectedMessageReply;
