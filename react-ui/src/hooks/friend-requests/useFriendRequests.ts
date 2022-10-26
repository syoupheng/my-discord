import { FriendRequest } from "../../types/user";

import { gql, useApolloClient } from "@apollo/client";
import { GET_AUTH_USER } from "../auth/useAuthUser";

const useFriendRequests = (): FriendRequest[] => {
  const client = useApolloClient();
  const { friendRequests } = client.readFragment({
    id: "AuthUser:{}",
    fragment: gql`
      fragment friendRequests on AuthUser {
        friendRequests {
          id
          username
          requestStatus
        }
      }
    `,
  });

  const result = client.watchQuery({ query: GET_AUTH_USER });

  return friendRequests;
};

export default useFriendRequests;
