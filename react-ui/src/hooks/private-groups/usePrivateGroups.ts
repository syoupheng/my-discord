import { gql, useQuery } from "@apollo/client";
import { PrivateGroup } from "../../types/private-group";
import useLogoutOnError from "../auth/useLogoutOnError";

export const GET_AUTH_USER_GROUPS = gql`
  query GetGroups {
    me {
      privateGroups {
        id
        createdAt
        name
        members {
          id
          username
        }
      }
    }
  }
`;

interface AuthGroupsResponse {
  me: { privateGroups: PrivateGroup[] };
}

const usePrivateGroups = () => {
  const onError = useLogoutOnError();
  return useQuery<AuthGroupsResponse>(GET_AUTH_USER_GROUPS, { fetchPolicy: "cache-only", onError });
};

export default usePrivateGroups;
