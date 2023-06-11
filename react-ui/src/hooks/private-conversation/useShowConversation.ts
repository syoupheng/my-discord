import { AUTH_USER_CACHE_ID } from "@/apollo.config";
import { graphql } from "@/gql";
import { ShowConversationMutation } from "@/gql/graphql";
import useAuthMutation from "@/hooks/auth/useAuthMutation";
import { Reference, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const SHOW_CONVERSATION = graphql(`
  mutation showConversation($friendId: Int!) {
    showConversation(friendId: $friendId) {
      ...PrivateConversation
    }
  }
`);

type Params = {
  friendId: number;
  redirect?: boolean;
}

const useShowConversation = ({ friendId, redirect = false }: Params) => {
  const navigate = useNavigate();
  return useAuthMutation(SHOW_CONVERSATION, {
    variables: { friendId },
    onCompleted: ({ showConversation: conversation }) => {
      if (redirect) navigate(`/channels/@me/${conversation.id}`);
    },
    update(cache, { data }: { data?: ShowConversationMutation | null }) {
      if (!data) return;
      cache.modify({
        id: AUTH_USER_CACHE_ID,
        fields: {
          privateConversations(existingConversationRefs = [], { readField }) {
            const { showConversation: newData } = data;
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

            if (existingConversationRefs.some((ref: Reference) => readField("id", ref) === newData)) return existingConversationRefs;

            return [newConversationRef, ...existingConversationRefs];
          },
        },
      });
    },
  });
};

export default useShowConversation;
