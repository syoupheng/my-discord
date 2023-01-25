import useAuthUser from "../auth/useAuthUser";
import useMessageContext from "./useMessageContext";

const useIsMessageAuthor = () => {
  const message = useMessageContext();
  const { data } = useAuthUser();
  if (!data) return false;
  return message.author.id === data.me.id;
};

export default useIsMessageAuthor;
