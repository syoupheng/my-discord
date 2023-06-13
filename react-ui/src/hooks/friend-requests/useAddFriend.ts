import { AUTH_USER_CACHE_ID } from "@/apollo.config";
import { FRIEND_REQUEST_FRAGMENT } from "@/fragments/auth";
import { graphql } from "@/gql";
import { SendFriendRequestMutation } from "@/gql/graphql";
import useAuthMutation from "@/hooks/auth/useAuthMutation";
import { Reference } from "@apollo/client";
import { useRef } from "react";

const ADD_FRIEND = graphql(`
  mutation sendFriendRequest($input: FriendTag!) {
    sendFriendRequest(friendTag: $input) {
      id
      username
      requestStatus
    }
  }
`);

const useAddFriend = () => {
  const abortController = useRef(new AbortController());
  const result = useAuthMutation(ADD_FRIEND, {
    context: {
      fetchOptions: {
        signal: abortController.current.signal
      }
    },
    update(cache, { data }: { data?: SendFriendRequestMutation | null }) {
      if (!data) return;
      cache.modify({
        id: AUTH_USER_CACHE_ID,
        fields: {
          friendRequests(existingFriendRequestRefs = [], { readField }) {
            const { sendFriendRequest: newData } = data;
            const newFriendRequestRef = cache.writeFragment({
              data: newData,
              fragment: FRIEND_REQUEST_FRAGMENT,
            });

            if (existingFriendRequestRefs.some((ref: Reference) => readField("id", ref) === newData)) return existingFriendRequestRefs;

            return [newFriendRequestRef, ...existingFriendRequestRefs];
          },
        },
      });
    },
  });

  return { result, abortController };
};

export default useAddFriend;
