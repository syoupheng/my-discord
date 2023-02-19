import { ChatScrollContext } from "../../providers/ChatScrollProvider";
import useSafeContext from "../shared/useSafeContext";

const useChatScrollContext = () => useSafeContext(ChatScrollContext, "useChatSCrollContext must be called inside of ChatScrollProvider !");

export default useChatScrollContext;
