import { useEffect } from "react";
import { graphql } from "@/gql";
import { AuthUserSubscriptionParams } from "@/components/PrivateApp";

const FRIEND_DELETED_SUBSCRIPTION = graphql(`
  subscription OnFriendDeleted($userId: Int!) {
    friendDeleted(userId: $userId)
  }
`);

const useFriendDeletedSub = ({ authUserId, subscribeToMore }: AuthUserSubscriptionParams) => {
  useEffect(() => {
    let unsubscribe: () => void;
    unsubscribe = subscribeToMore({
      document: FRIEND_DELETED_SUBSCRIPTION,
      variables: { userId: authUserId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const friendId = subscriptionData.data.friendDeleted;
        const newFriends = prev.me.friends.filter((friend) => friend.id !== friendId);
        const newData = { ...prev.me, friends: newFriends };

        return { me: newData };
      },
    });

    return () => !!unsubscribe && unsubscribe();
  }, []);
};

export default useFriendDeletedSub;
