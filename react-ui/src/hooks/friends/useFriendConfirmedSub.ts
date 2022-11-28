import { gql } from "@apollo/client";
import { useEffect } from "react";
import { PrivateConversation } from "../../types/private-conversation";
import { Friend } from "../../types/user";
import useAuthUser from "../auth/useAuthUser";

const CONFIRM_FRIEND_REQUEST_SUBSCRIPTION = gql`
  subscription OnFriendRequestConfirmed($userId: Int!) {
    friendRequestConfirmed(userId: $userId) {
      newFriend {
        id
        username
        status
      }
      newConversation {
        id
        createdAt
        member {
          id
          username
        }
      }
    }
  }
`;

const useFriendConfirmedSub = () => {
  const { subscribeToMore, data } = useAuthUser();

  useEffect(() => {
    let unsubscribe: () => void;
    if (data) {
      unsubscribe = subscribeToMore<{ friendRequestConfirmed: { newFriend: Friend; newConversation: PrivateConversation } }>({
        document: CONFIRM_FRIEND_REQUEST_SUBSCRIPTION,
        variables: { userId: data.me.id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          console.log("sub payload : ", subscriptionData.data);
          const { newFriend, newConversation } = subscriptionData.data.friendRequestConfirmed;
          const newFriendRequests = prev.me.friendRequests.filter((request) => request.id !== newFriend.id);
          const newData = {
            ...prev.me,
            friends: prev.me.friends.some((friend) => friend.id === newFriend.id) ? prev.me.friends : [newFriend, ...prev.me.friends],
            friendRequests: newFriendRequests,
            privateConversations: prev.me.privateConversations.some((conv) => conv.id === newConversation.id)
              ? prev.me.privateConversations
              : [newConversation, ...prev.me.privateConversations],
          };

          return { me: newData };
        },
      });
    }

    return () => !!unsubscribe && unsubscribe();
  }, []);
};

export default useFriendConfirmedSub;
