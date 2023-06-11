import useSafeContext from "@/hooks/shared/useSafeContext";
import { SelectedMessageReplyContext } from "@/providers/SelectedMessageReplyProvider";

const useSelectedMessageReply = () => useSafeContext(SelectedMessageReplyContext, "useMessageReply must be used inside of MessageReplyProvider !");

export default useSelectedMessageReply;
