import { gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AUTH_USER_CACHE_ID } from "../../apollo.config";
import { ConversationMember } from "../../types/private-conversation";
import useAuthMutation from "../auth/useAuthMutation";

const SHOW_CONVERSATION = gql`
  mutation showConversation($friendId: Int!) {
    showConversation(friendId: $friendId) {
      id
      createdAt
      member {
        id
        username
      }
    }
  }
`;

interface MutationResponse {
  showConversation: {
    id: number;
    createdAt: Date;
    member: ConversationMember;
  };
}

interface TParams {
  friendId: number;
  redirect?: boolean;
}

const useShowConversation = ({ friendId, redirect = false }: TParams) => {
  const navigate = useNavigate();
  return useAuthMutation<MutationResponse>(SHOW_CONVERSATION, {
    variables: { friendId },
    onCompleted: ({ showConversation: conversation }) => {
      if (redirect) navigate(`/channels/@me/conversations/${conversation.id}`);
    },
    update(cache, { data }) {
      cache.modify({
        id: AUTH_USER_CACHE_ID,
        fields: {
          privateConversations(existingConversationRefs = [], { readField }) {
            const { showConversation: newData } = data as MutationResponse;
            const newConversationRef = cache.writeFragment({
              data: newData,
              fragment: gql`
                fragment NewConversation on PrivateConversation {
                  id
                  createdAt
                  member {
                    id
                    username
                  }
                }
              `,
            });

            if (existingConversationRefs.some((ref: any) => readField("id", ref) === newData)) return existingConversationRefs;

            return [newConversationRef, ...existingConversationRefs];
          },
        },
      });
    },
  });
};

export default useShowConversation;
