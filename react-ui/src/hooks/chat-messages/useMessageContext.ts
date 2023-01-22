import { MessageItemContext } from "../../providers/MessageItemProvider";
import useSafeContext from "../useSafeContext";

const useMessageContext = () => useSafeContext(MessageItemContext, "useMessageContext must be used inside of MessageItemProvider !");

export default useMessageContext;
