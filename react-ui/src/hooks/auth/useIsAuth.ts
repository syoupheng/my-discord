import { graphql } from "@/gql";
import useLogout from "@/hooks/auth/useLogout";
import { useQuery } from "@apollo/client";

export const CHECK_AUTH_COOKIE = graphql(`
  query IsUserAuthenticated {
    checkAuthCookie {
      success
    }
  }
`);

const POLL_INTERVAL = 120000;

const useIsAuth = () => {
  const [logout] = useLogout();
  return useQuery(CHECK_AUTH_COOKIE, { pollInterval: POLL_INTERVAL, onError: () => logout() });
};

export default useIsAuth;
