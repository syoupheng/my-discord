import { useSubscription } from "@apollo/client";
import useAuthUserInfo from "@/hooks/auth/useAuthUserInfo";
import { graphql } from "@/gql";

const FRIEND_PROFILE_CHANGE_SUBSCRIPTION = graphql(`
  subscription OnFriendProfileChanged($userId: Int!) {
    friendProfileChanged(userId: $userId) {
      id
      username
      status
    }
  }
`);

const useFriendChangeSub = () => {
  const authUser = useAuthUserInfo();
  return useSubscription(FRIEND_PROFILE_CHANGE_SUBSCRIPTION, { variables: { userId: authUser.id } });
};

export default useFriendChangeSub;
