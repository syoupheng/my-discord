import { graphql } from "@/gql";
import { useQuery } from "@apollo/client";

export const GET_AUTH_USER_FRIEND_REQUESTS = graphql(`
  query GetAuthUserFriendRequest {
    me {
      friendRequests {
        ...FriendRequest
      }
    }
  }
`);

const useFriendRequests = () => {
  const { data } = useQuery(GET_AUTH_USER_FRIEND_REQUESTS, { fetchPolicy: "cache-only" });
  if (!data) throw new Error("This hook should be called in the authenticated part of the app");
  return data.me.friendRequests;
};

export default useFriendRequests;
