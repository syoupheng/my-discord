import { Reference } from "@apollo/client";
import { graphql } from "@/gql";
import useAuthMutation from "@/hooks/auth/useAuthMutation";
import { GET_AUTH_USER_CONVERSATIONS } from "@/hooks/private-conversation/usePrivateConversations";
import { AUTH_USER_CACHE_ID } from "@/apollo.config";
import { AddNewFriendMutation } from "@/gql/graphql";
import { FRIEND_FRAGMENT } from "@/fragments/auth";

const CONFIRM_FRIEND = graphql(`
  mutation addNewFriend($friendId: Int!) {
    addFriend(friendId: $friendId) {
      ...Friend
    }
  }
`);

const useConfirmFriend = () => {
  return useAuthMutation(CONFIRM_FRIEND, {
    refetchQueries: [{ query: GET_AUTH_USER_CONVERSATIONS }],
    update(cache, { data }: { data?: AddNewFriendMutation | null}) {
      if (!data) return;
      cache.modify({
        id: AUTH_USER_CACHE_ID,
        fields: {
          friendRequests(existingFriendRequestRefs, { readField }) {
            return existingFriendRequestRefs.filter((ref: Reference) => readField("id", ref) !== data?.addFriend.id);
          },

          friends(existingFriendRefs = [], { readField }) {
            const { addFriend: newData } = data;
            const newFriendRef = cache.writeFragment({
              data: newData,
              fragment: FRIEND_FRAGMENT
            });

            if (existingFriendRefs.some((ref: Reference) => readField("id", ref) === newData)) return existingFriendRefs;

            return [newFriendRef, ...existingFriendRefs];
          },
        },
      });
    },
  });
};

export default useConfirmFriend;
