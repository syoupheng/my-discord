import { gql } from "@apollo/client";
import { AUTH_USER_CACHE_ID } from "../../apollo.config";
import useAuthMutation from "../auth/useAuthMutation";

const DELETE_FRIEND_REQUEST = gql`
  mutation deleteFriendRequest($friendId: Int!) {
    deleteFriendRequest(friendId: $friendId) {
      success
    }
  }
`;

const useDeleteFriendRequest = (friendId: number) => {
  return useAuthMutation(DELETE_FRIEND_REQUEST, {
    variables: { friendId },
    update(cache) {
      cache.modify({
        id: AUTH_USER_CACHE_ID,
        fields: {
          friendRequests(existingFriendRequestRefs, { readField }) {
            return existingFriendRequestRefs.filter((ref: any) => readField("id", ref) !== friendId);
          },
        },
      });
    },
  });
};

export default useDeleteFriendRequest;
