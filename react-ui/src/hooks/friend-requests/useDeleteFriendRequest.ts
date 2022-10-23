import { gql, useMutation } from "@apollo/client";

const DELETE_FRIEND_REQUEST = gql`
  mutation deleteFriendRequest($friendId: Int!) {
    deleteFriendRequest(friendId: $friendId) {
      success
    }
  }
`;

const useDeleteFriendRequest = () => {
  return useMutation(DELETE_FRIEND_REQUEST);
};

export default useDeleteFriendRequest;
