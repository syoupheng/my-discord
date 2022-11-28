import { gql } from "@apollo/client";
import { AUTH_USER_CACHE_ID } from "../../apollo.config";
import { Friend } from "../../types/user";
import useAuthMutation from "../auth/useAuthMutation";
import { GET_AUTH_USER_CONVERSATIONS } from "../private-conversation/usePrivateConversations";

const CONFIRM_FRIEND = gql`
  mutation addNewFriend($friendId: Int!) {
    addFriend(friendId: $friendId) {
      id
      username
      status
    }
  }
`;

interface MutationResponse {
  addFriend: Friend;
}

const useConfirmFriend = () => {
  return useAuthMutation<MutationResponse>(CONFIRM_FRIEND, {
    refetchQueries: [{ query: GET_AUTH_USER_CONVERSATIONS }],
    update(cache, { data }) {
      cache.modify({
        id: AUTH_USER_CACHE_ID,
        fields: {
          friendRequests(existingFriendRequestRefs, { readField }) {
            return existingFriendRequestRefs.filter((ref: any) => readField("id", ref) !== data?.addFriend.id);
          },

          friends(existingFriendRefs = [], { readField }) {
            const { addFriend: newData } = data as MutationResponse;
            const newFriendRef = cache.writeFragment({
              data: newData,
              fragment: gql`
                fragment NewFriend on Friend {
                  id
                  username
                  status
                }
              `,
            });

            if (existingFriendRefs.some((ref: any) => readField("id", ref) === newData)) return existingFriendRefs;

            return [newFriendRef, ...existingFriendRefs];
          },
        },
      });
    },
  });
};

export default useConfirmFriend;
