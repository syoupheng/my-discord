import { AuthUserSubscriptionParams } from "@/components/PrivateApp";
import { graphql } from "@/gql";
import { useEffect } from "react";

const FRIEND_REQUEST_DELETED_SUBSCRIPTION = graphql(`
  subscription OnFriendRequestDeleted($userId: Int!) {
    friendRequestDeleted(userId: $userId)
  }
`);

const useFriendReqDeletedSub = ({ authUserId, subscribeToMore }: AuthUserSubscriptionParams) => {
  useEffect(() => {
    let unsubscribe: () => void;
    unsubscribe = subscribeToMore<{ friendRequestDeleted: number }>({
      document: FRIEND_REQUEST_DELETED_SUBSCRIPTION,
      variables: { userId: authUserId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const requestId = subscriptionData.data.friendRequestDeleted;
        const newFriendRequests = prev.me.friendRequests.filter((request) => request.id !== requestId);
        const newData = { ...prev.me, friendRequests: newFriendRequests };

        return { me: newData };
      },
    });

    return () => !!unsubscribe && unsubscribe();
  }, []);
};

export default useFriendReqDeletedSub;
