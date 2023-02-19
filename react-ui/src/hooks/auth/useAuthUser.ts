import { gql, useQuery, WatchQueryFetchPolicy } from "@apollo/client";
import { AUTH_USER_FIELDS } from "../../fragments/auth";
import { AuthUser } from "../../gql/graphql";
import useLogoutOnError from "./useLogoutOnError";

export const GET_AUTH_USER = gql`
  ${AUTH_USER_FIELDS}
  query GetAuthUser {
    me {
      ...AuthUserFields
    }
  }
`;

interface QueryOptions {
  fetchPolicy?: WatchQueryFetchPolicy;
}

interface AuthUserResponse {
  me: AuthUser;
}

const useAuthUser = ({ fetchPolicy }: QueryOptions = { fetchPolicy: "cache-first" }) => {
  const onError = useLogoutOnError();
  return useQuery<AuthUserResponse>(GET_AUTH_USER, {
    fetchPolicy,
    onError,
  });
};

export default useAuthUser;
