import useSafeContext from "@/hooks/shared/useSafeContext";
import { MessageItemContext } from "@/providers/MessageItemProvider";

const useMessageContext = () => useSafeContext(MessageItemContext, "useMessageContext must be used inside of MessageItemProvider !");

export default useMessageContext;
