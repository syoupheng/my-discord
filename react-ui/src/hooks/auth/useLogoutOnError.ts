import { ApolloError } from "@apollo/client";
import useLogout from "./useLogout";

const useLogoutOnError = () => {
  const [logout] = useLogout();

  const onError = (error: ApolloError) => {
    if ("graphQLErrors" in error) {
      if (error.graphQLErrors.some((err) => err.extensions.code === "UNAUTHENTICATED")) logout();
    }
  };

  return onError;
};

export default useLogoutOnError;
