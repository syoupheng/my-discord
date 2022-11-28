import { gql } from "@apollo/client";
import { AUTH_USER_CACHE_ID } from "../../apollo.config";
import useAuthMutation from "../auth/useAuthMutation";

const DELETE_FRIEND = gql`
  mutation deleteFriend($friendId: Int!) {
    deleteFriend(friendId: $friendId) {
      success
    }
  }
`;

const useDeleteFriend = (friendId: number) => {
  return useAuthMutation(DELETE_FRIEND, {
    variables: { friendId },
    update(cache) {
      cache.modify({
        id: AUTH_USER_CACHE_ID,
        fields: {
          friends(existingFriendRefs, { readField }) {
            return existingFriendRefs.filter((ref: any) => readField("id", ref) !== friendId);
          },
        },
      });
    },
  });
};

export default useDeleteFriend;
