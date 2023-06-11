import { Reference } from "@apollo/client";
import { graphql } from "@/gql";
import useAuthMutation from "@/hooks/auth/useAuthMutation";
import { AUTH_USER_CACHE_ID } from "@/apollo.config";

const HIDE_CONVERSATION = graphql(`
  mutation hideConversation($conversationId: Int!) {
    hideConversation(conversationId: $conversationId) {
      id
    }
  }
`);

const useHideConversation = (conversationId: number) => {
  return useAuthMutation(HIDE_CONVERSATION, {
    variables: { conversationId },
    update(cache) {
      cache.modify({
        id: AUTH_USER_CACHE_ID,
        fields: {
          privateConversations(existingConversationRefs, { readField }) {
            return existingConversationRefs.filter((ref: Reference) => readField("id", ref) !== conversationId);
          },
        },
      });
    },
  });
};

export default useHideConversation;
