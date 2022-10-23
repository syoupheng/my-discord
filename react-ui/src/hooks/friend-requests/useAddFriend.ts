import { gql, useMutation } from "@apollo/client";

const ADD_FRIEND = gql`
  mutation sendFriendRequest($input: FriendTag!) {
    sendFriendRequest(friendTag: $input) {
      id
      username
      requestStatus
    }
  }
`;

const useAddFriend = () => {
  return useMutation(ADD_FRIEND);
};

export default useAddFriend;
