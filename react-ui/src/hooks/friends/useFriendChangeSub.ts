import { gql, useSubscription } from "@apollo/client";
import useAuthUser from "../auth/useAuthUser";

const FRIEND_PROFILE_CHANGE_SUBSCRIPTION = gql`
  subscription OnFriendProfileChanged($userId: Int!) {
    friendProfileChanged(userId: $userId) {
      id
      username
      status
    }
  }
`;

const useFriendChangeSub = () => {
  const { data } = useAuthUser();

  return useSubscription(FRIEND_PROFILE_CHANGE_SUBSCRIPTION, { variables: { userId: data?.me.id } });
};

export default useFriendChangeSub;
