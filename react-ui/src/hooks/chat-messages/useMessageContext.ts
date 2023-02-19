import { MessageItemContext } from "../../providers/MessageItemProvider";
import useSafeContext from "../shared/useSafeContext";

const useMessageContext = () => useSafeContext(MessageItemContext, "useMessageContext must be used inside of MessageItemProvider !");

export default useMessageContext;
