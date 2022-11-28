import { gql } from "@apollo/client";
import { AUTH_USER_CACHE_ID } from "../../apollo.config";
import useAuthMutation from "../auth/useAuthMutation";

const IGNORE_FRIEND_REQUEST = gql`
  mutation ignoreFriendRequest($friendId: Int!) {
    ignoreFriendRequest(friendId: $friendId) {
      success
    }
  }
`;

const useIgnoreFriendRequest = (friendId: number) => {
  return useAuthMutation(IGNORE_FRIEND_REQUEST, {
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

export default useIgnoreFriendRequest;
