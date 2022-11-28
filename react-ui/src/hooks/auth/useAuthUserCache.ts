import { useApolloClient } from "@apollo/client";
import { AUTH_USER_CACHE_ID } from "../../apollo.config";
import { AUTH_USER_FIELDS } from "../../fragments/auth";
import { User } from "../../types/user";

const useAuthUserCache = (): User | null => {
  const client = useApolloClient();
  return client.readFragment({
    id: AUTH_USER_CACHE_ID,
    fragment: AUTH_USER_FIELDS,
  });
};

export default useAuthUserCache;
