import { FriendRequest } from "../../types/user";

import { gql, useApolloClient } from "@apollo/client";

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

  return friendRequests;
};

export default useFriendRequests;
