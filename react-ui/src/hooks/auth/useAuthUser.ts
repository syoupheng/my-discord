import { graphql } from "@/gql";
import { GetAuthUserQuery } from "@/gql/graphql";
import useLogoutOnError from "@/hooks/auth/useLogoutOnError";
import { QueryHookOptions, useQuery } from "@apollo/client";

export const GET_AUTH_USER = graphql(`
  query GetAuthUser {
    me {
      ...AuthUser
    }
  }
`);

const useAuthUser = (options?: QueryHookOptions<GetAuthUserQuery>) => {
  const onError = useLogoutOnError();
  return useQuery(GET_AUTH_USER, { ...options, onError });
};

export default useAuthUser;
