import { gql } from "@apollo/client";
import { useEffect } from "react";
import useAuthUser from "../auth/useAuthUser";

const FRIEND_REQUEST_DELETED_SUBSCRIPTION = gql`
  subscription OnFriendRequestDeleted($userId: Int!) {
    friendRequestDeleted(userId: $userId)
  }
`;

const useFriendReqDeletedSub = () => {
  const { subscribeToMore, data } = useAuthUser();

  useEffect(() => {
    let unsubscribe: () => void;
    if (data) {
      unsubscribe = subscribeToMore<{ friendRequestDeleted: number }>({
        document: FRIEND_REQUEST_DELETED_SUBSCRIPTION,
        variables: { userId: data.me.id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const requestId = subscriptionData.data.friendRequestDeleted;
          const newFriendRequests = prev.me.friendRequests.filter((request) => request.id !== requestId);
          const newData = { ...prev.me, friendRequests: newFriendRequests };

          return { me: newData };
        },
      });
    }

    return () => !!unsubscribe && unsubscribe();
  }, []);
  return;
};

export default useFriendReqDeletedSub;
