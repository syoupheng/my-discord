import useAuthUserInfo from "@/hooks/auth/useAuthUserInfo";
import useMessageContext from "@/hooks/chat-messages/useMessageContext";

const useIsMessageAuthor = () => {
  const message = useMessageContext();
  const { id } = useAuthUserInfo();
  return message.author.id === id;
};

export default useIsMessageAuthor;
