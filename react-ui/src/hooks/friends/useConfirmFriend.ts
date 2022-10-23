import { gql, useMutation } from "@apollo/client";

const CONFIRM_FRIEND = gql`
  mutation addNewFriend($friendId: Int!) {
    addFriend(friendId: $friendId) {
      id
      username
      status
    }
  }
`;

const useConfirmFriend = () => {
  return useMutation(CONFIRM_FRIEND);
};

export default useConfirmFriend;
