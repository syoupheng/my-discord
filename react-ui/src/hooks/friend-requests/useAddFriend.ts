import { gql, useMutation } from "@apollo/client";
import { AUTH_USER_CACHE_ID } from "../../apollo.config";
import { FriendRequest } from "../../types/user";

const ADD_FRIEND = gql`
  mutation sendFriendRequest($input: FriendTag!) {
    sendFriendRequest(friendTag: $input) {
      id
      username
      requestStatus
    }
  }
`;

interface MutationResponse {
  sendFriendRequest: FriendRequest;
}

const useAddFriend = () => {
  return useMutation<MutationResponse>(ADD_FRIEND, {
    update(cache, { data }) {
      cache.modify({
        id: AUTH_USER_CACHE_ID,
        fields: {
          friendRequests(existingFriendRequestRefs = [], { readField }) {
            const { sendFriendRequest: newData } = data as MutationResponse;
            const newFriendRequestRef = cache.writeFragment({
              data: newData,
              fragment: gql`
                fragment NewFriendRequest on FriendRequest {
                  id
                  username
                  requestStatus
                }
              `,
            });

            if (existingFriendRequestRefs.some((ref: any) => readField("id", ref) === newData)) return existingFriendRequestRefs;

            return [newFriendRequestRef, ...existingFriendRequestRefs];
          },
        },
      });
    },
  });
};

export default useAddFriend;
