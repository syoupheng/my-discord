import { gql } from "@apollo/client";
import { useEffect } from "react";
import useAuthUser from "../auth/useAuthUser";

const FRIEND_DELETED_SUBSCRIPTION = gql`
  subscription OnFriendDeleted($userId: Int!) {
    friendDeleted(userId: $userId)
  }
`;

const useFriendDeletedSub = () => {
  const { subscribeToMore, data } = useAuthUser();

  useEffect(() => {
    let unsubscribe: () => void;
    if (data) {
      unsubscribe = subscribeToMore<{ friendDeleted: number }>({
        document: FRIEND_DELETED_SUBSCRIPTION,
        variables: { userId: data.me.id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const friendId = subscriptionData.data.friendDeleted;
          const newFriends = prev.me.friends.filter((friend) => friend.id !== friendId);
          const newData = { ...prev.me, friends: newFriends };

          return { me: newData };
        },
      });
    }

    return () => !!unsubscribe && unsubscribe();
  }, []);
};

export default useFriendDeletedSub;
