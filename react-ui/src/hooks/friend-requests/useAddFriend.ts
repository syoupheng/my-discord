import { AUTH_USER_CACHE_ID } from "@/apollo.config";
import { FRIEND_REQUEST_FRAGMENT } from "@/fragments/auth";
import { graphql } from "@/gql";
import { SendFriendRequestMutation } from "@/gql/graphql";
import useAuthMutation from "@/hooks/auth/useAuthMutation";
import { Reference, useApolloClient } from "@apollo/client";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const ADD_FRIEND = graphql(`
  mutation sendFriendRequest($input: FriendTag!) {
    sendFriendRequest(friendTag: $input) {
      ...FriendRequest
    }
  }
`);

type Params = {
  onCompleted: (...args: any[]) => any;
  onError: (...args: any[]) => any;
};

const useAddFriend = ({ onCompleted, onError }: Params) => {
  const client = useApolloClient();
  const navigate = useNavigate();
  const abortController = useRef(new AbortController());
  const result = useAuthMutation(ADD_FRIEND, {
    onCompleted,
    onError: (error) => {
      if ("graphQLErrors" in error) {
        if (error.graphQLErrors.some((err) => err.extensions.code === "UNAUTHENTICATED")) {
          client.resetStore();
          navigate("/login");
        }
      }
      onError(error.message);
    },
    context: {
      fetchOptions: {
        signal: abortController.current.signal,
      },
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
