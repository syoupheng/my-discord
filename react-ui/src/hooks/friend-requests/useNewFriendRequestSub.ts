import { gql } from "@apollo/client";
import { useEffect } from "react";
import { FriendRequest } from "../../types/user";
import useAuthUser from "../auth/useAuthUser";

const NEW_FRIEND_REQUEST_SUBSCRIPTION = gql`
  subscription OnFriendRequestReceived($userId: Int!) {
    friendRequestReceived(userId: $userId) {
      id
      username
      requestStatus
    }
  }
`;

const useNewFriendRequestSub = () => {
  const { subscribeToMore, data } = useAuthUser();

  useEffect(() => {
    let unsubscribe: () => void;
    if (data) {
      unsubscribe = subscribeToMore<{ friendRequestReceived: FriendRequest }>({
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
