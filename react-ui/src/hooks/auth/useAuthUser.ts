import { gql, useQuery } from "@apollo/client";
import { AUTH_USER_FIELDS } from "../../fragments/auth";
import { User } from "../../types/user";

const GET_AUTH_USER = gql`
  ${AUTH_USER_FIELDS}
  query GetAuthUser {
    me {
      ...AuthUserFields
    }
  }
`;

const useAuthUser = () => useQuery<User>(GET_AUTH_USER);

export default useAuthUser;
