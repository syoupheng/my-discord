import { AUTH_USER_CACHE_ID } from "@/apollo.config";
import { graphql } from "@/gql";
import useAuthMutation from "@/hooks/auth/useAuthMutation";
import { Reference } from "@apollo/client";

const DELETE_FRIEND = graphql(`
  mutation deleteFriend($friendId: Int!) {
    deleteFriend(friendId: $friendId) {
      success
    }
  }
`);

const useDeleteFriend = (friendId: number) => {
  return useAuthMutation(DELETE_FRIEND, {
    variables: { friendId },
    update(cache) {
      cache.modify({
        id: AUTH_USER_CACHE_ID,
        fields: {
          friends(existingFriendRefs, { readField }) {
            return existingFriendRefs.filter((ref: Reference) => readField("id", ref) !== friendId);
          },
        },
      });
    },
  });
};

export default useDeleteFriend;
