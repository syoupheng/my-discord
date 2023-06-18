import useLogout from "@/hooks/auth/useLogout";
import { ApolloError } from "@apollo/client";

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
