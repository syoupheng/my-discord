import { gql, useMutation } from "@apollo/client";
import { AUTH_USER_CACHE_ID } from "../../apollo.config";
import { Friend } from "../../types/user";

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
  return useMutation<MutationResponse>(CONFIRM_FRIEND, {
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
