import { gql, useMutation } from "@apollo/client";

const DELETE_FRIEND_REQUEST = gql`
  mutation deleteFriendRequest($friendId: Int!) {
    deleteFriendRequest(friendId: $friendId) {
      success
    }
  }
`;

const useDeleteFriendRequest = (friendId: number) => {
  return useMutation(DELETE_FRIEND_REQUEST, {
    variables: { friendId },
    update(cache) {
      cache.modify({
        id: "AuthUser:{}",
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
