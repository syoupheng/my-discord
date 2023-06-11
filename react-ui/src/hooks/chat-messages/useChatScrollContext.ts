import useSafeContext from "@/hooks/shared/useSafeContext";
import { ChatScrollContext } from "@/providers/ChatScrollProvider";


const useChatScrollContext = () => useSafeContext(ChatScrollContext, "useChatSCrollContext must be called inside of ChatScrollProvider !");

export default useChatScrollContext;
