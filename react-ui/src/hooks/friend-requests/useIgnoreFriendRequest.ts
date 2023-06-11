import { Reference } from "@apollo/client";
import { graphql } from "@/gql";
import useAuthMutation from "@/hooks/auth/useAuthMutation";
import { AUTH_USER_CACHE_ID } from "@/apollo.config";

const IGNORE_FRIEND_REQUEST = graphql(`
  mutation ignoreFriendRequest($friendId: Int!) {
    ignoreFriendRequest(friendId: $friendId) {
      success
    }
  }
`);

const useIgnoreFriendRequest = (friendId: number) => {
  return useAuthMutation(IGNORE_FRIEND_REQUEST, {
    variables: { friendId },
    update(cache) {
      cache.modify({
        id: AUTH_USER_CACHE_ID,
        fields: {
          friendRequests(existingFriendRequestRefs, { readField }) {
            return existingFriendRequestRefs.filter((ref: Reference) => readField("id", ref) !== friendId);
          },
        },
      });
    },
  });
};

export default useIgnoreFriendRequest;
