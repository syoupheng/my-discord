import { gql } from "@apollo/client";
import { useEffect } from "react";
import { Friend } from "../../types/user";
import useAuthUser from "../auth/useAuthUser";

const CONFIRM_FRIEND_REQUEST_SUBSCRIPTION = gql`
  subscription OnFriendRequestConfirmed($userId: Int!) {
    friendRequestConfirmed(userId: $userId) {
      id
      username
      status
    }
  }
`;

const useFriendConfirmedSub = () => {
  const { subscribeToMore, data } = useAuthUser();

  useEffect(() => {
    let unsubscribe: () => void;
    if (data) {
      unsubscribe = subscribeToMore<{ friendRequestConfirmed: Friend }>({
        document: CONFIRM_FRIEND_REQUEST_SUBSCRIPTION,
        variables: { userId: data.me.id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newFriend = subscriptionData.data.friendRequestConfirmed;
          const newFriendRequests = prev.me.friendRequests.filter((request) => request.id !== newFriend.id);
          if (prev.me.friends.some((request) => request.id === newFriend.id)) return { me: { ...prev.me, friendRequests: newFriendRequests } };
          const newData = { ...prev.me, friends: [newFriend, ...prev.me.friends], friendRequests: newFriendRequests };

          return { me: newData };
        },
      });
    }

    return () => !!unsubscribe && unsubscribe();
  }, []);
};

export default useFriendConfirmedSub;
