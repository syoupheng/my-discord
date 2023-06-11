import { useEffect } from "react";
import { graphql } from "@/gql";
import useAuthUser from "@/hooks/auth/useAuthUser";

const NEW_FRIEND_REQUEST_SUBSCRIPTION = graphql(`
  subscription OnFriendRequestReceived($userId: Int!) {
    friendRequestReceived(userId: $userId) {
      ...FriendRequest
    }
  }
`);

const useNewFriendRequestSub = () => {
  const { subscribeToMore, data } = useAuthUser();

  useEffect(() => {
    let unsubscribe: () => void;
    if (data) {
      unsubscribe = subscribeToMore({
        document: NEW_FRIEND_REQUEST_SUBSCRIPTION,
        variables: { userId: data.me.id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newFriendRequest = subscriptionData.data.friendRequestReceived;
          if (prev.me.friendRequests.some((request) => request.id === newFriendRequest.id)) return prev;
          const newData = { ...prev.me, friendRequests: [newFriendRequest, ...prev.me.friendRequests] };

          return { me: newData };
        },
      });
    }

    return () => !!unsubscribe && unsubscribe();
  }, []);
};

export default useNewFriendRequestSub;
