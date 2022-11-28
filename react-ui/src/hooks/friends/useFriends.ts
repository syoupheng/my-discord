import { gql, useQuery } from "@apollo/client";
import { Friend } from "../../types/user";
import useLogoutOnError from "../auth/useLogoutOnError";

export const GET_AUTH_USER_FRIENDS = gql`
  query GetFriends {
    me {
      friends {
        id
        username
        status
      }
    }
  }
`;

interface AuthFriendsResponse {
  me: { friends: Friend[] };
}

const useFriends = () => {
  const onError = useLogoutOnError();
  return useQuery<AuthFriendsResponse>(GET_AUTH_USER_FRIENDS, {
    fetchPolicy: "cache-only",
    onError,
  });
};

export default useFriends;
