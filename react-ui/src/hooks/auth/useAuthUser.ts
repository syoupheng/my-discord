import { QueryHookOptions, useQuery } from "@apollo/client";
import useLogoutOnError from "./useLogoutOnError";
import { graphql } from "../../gql";

export const GET_AUTH_USER = graphql(`
  query GetAuthUser {
    me {
      ...AuthUserFields
    }
  }
`);

const useAuthUser = (options?: QueryHookOptions) => {
  const onError = useLogoutOnError();
  return useQuery(GET_AUTH_USER, { ...options, onError });
};

export default useAuthUser;
