import { useApolloClient } from "@apollo/client";
import useWindowFocus from "../ui/useWindowFocus";
import { GET_AUTH_USER } from "./useAuthUser";

const useRefetchUserOnFocus = () => {
  const client = useApolloClient();
  useWindowFocus(() => client.refetchQueries({ include: [GET_AUTH_USER] }));
};

export default useRefetchUserOnFocus;
