import { useEffect } from "react";
import { graphql } from "@/gql";
import { AuthUserSubscriptionParams } from "@/components/PrivateApp";

const NEW_FRIEND_REQUEST_SUBSCRIPTION = graphql(`
  subscription OnFriendRequestReceived($userId: Int!) {
    friendRequestReceived(userId: $userId) {
      ...FriendRequest
    }
  }
`);

const useNewFriendRequestSub = ({ authUserId, subscribeToMore }: AuthUserSubscriptionParams) => {
  useEffect(() => {
    let unsubscribe: () => void;
    unsubscribe = subscribeToMore({
      document: NEW_FRIEND_REQUEST_SUBSCRIPTION,
      variables: { userId: authUserId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFriendRequest = subscriptionData.data.friendRequestReceived;
        if (prev.me.friendRequests.some((request) => request.id === newFriendRequest.id)) return prev;
        const newData = { ...prev.me, friendRequests: [newFriendRequest, ...prev.me.friendRequests] };

        return { me: newData };
      },
    });

    return () => !!unsubscribe && unsubscribe();
  }, []);
};

export default useNewFriendRequestSub;
