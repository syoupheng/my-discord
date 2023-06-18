import { useSubscription } from "@apollo/client";
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

const useFriendChangeSub = (authUserId: number) => {
  return useSubscription(FRIEND_PROFILE_CHANGE_SUBSCRIPTION, { variables: { userId: authUserId } });
};

export default useFriendChangeSub;
