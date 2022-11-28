import { gql } from "@apollo/client";
import { AUTH_USER_CACHE_ID } from "../../apollo.config";
import useAuthMutation from "../auth/useAuthMutation";

const HIDE_CONVERSATION = gql`
  mutation hideConversation($conversationId: Int!) {
    hideConversation(conversationId: $conversationId) {
      id
    }
  }
`;

interface MutationResponse {
  hideConversation: {
    id: number;
  };
}

const useHideConversation = (conversationId: number) => {
  return useAuthMutation<MutationResponse>(HIDE_CONVERSATION, {
    variables: { conversationId },
    update(cache) {
      cache.modify({
        id: AUTH_USER_CACHE_ID,
        fields: {
          privateConversations(existingConversationRefs, { readField }) {
            return existingConversationRefs.filter((ref: any) => readField("id", ref) !== conversationId);
          },
        },
      });
    },
  });
};

export default useHideConversation;
