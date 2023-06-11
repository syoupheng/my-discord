import { AUTH_USER_CACHE_ID } from "@/apollo.config";
import { graphql } from "@/gql";
import useAuthMutation from "@/hooks/auth/useAuthMutation";
import { Reference } from "@apollo/client";

const DELETE_FRIEND_REQUEST = graphql(`
  mutation deleteFriendRequest($friendId: Int!) {
    deleteFriendRequest(friendId: $friendId) {
      success
    }
  }
`);

const useDeleteFriendRequest = (friendId: number) => {
  return useAuthMutation(DELETE_FRIEND_REQUEST, {
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

export default useDeleteFriendRequest;
