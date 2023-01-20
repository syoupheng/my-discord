import { useContext } from "react";
import { MessageItemContext } from "../../providers/MessageItemProvider";

const useMessageContext = () => {
  const context = useContext(MessageItemContext);
  if (context === null) throw new Error("useMessageContext must be used inside of MessageItemProvider !");
  return context;
};

export default useMessageContext;
