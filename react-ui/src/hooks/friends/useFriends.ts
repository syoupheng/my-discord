import { gql, useQuery } from "@apollo/client";
import { Friend } from "../../types/user";

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
  return useQuery<AuthFriendsResponse>(GET_AUTH_USER_FRIENDS, { fetchPolicy: "cache-only" });
};

export default useFriends;
