import { ClickedReplyContext } from "../../providers/ClickedReplyProvider";
import useSafeContext from "../shared/useSafeContext";

const useScrollReplyContext = () => useSafeContext(ClickedReplyContext, "useScrollReplyContext must be used inside of a ReplyScrollProvider !");

export default useScrollReplyContext;
