import { ClickedReplyContext } from "../../providers/ClickedReplyProvider";
import useSafeContext from "../useSafeContext";

const useScrollReplyContext = () => useSafeContext(ClickedReplyContext, "useScrollReplyContext must be used inside of a ReplyScrollProvider !");

export default useScrollReplyContext;
