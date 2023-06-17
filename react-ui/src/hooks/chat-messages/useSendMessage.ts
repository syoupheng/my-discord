import { graphql } from "@/gql";
import useAuthMutation from "@/hooks/auth/useAuthMutation";
import { GET_CHAT_MESSAGES } from "@/hooks/chat-messages/useChatMessages";
import useChatScrollContext from "@/hooks/chat-messages/useChatScrollContext";
import { ERROR_MESSAGE } from "@/utils/apollo";
import { toast } from "react-hot-toast";

const SEND_MESSAGE = graphql(`
  mutation sendMessage($input: SendMessageInput!) {
    sendMessage(sendMessageInput: $input) {
      ...Message
    }
  }
`);

const useSendMessage = (channelId: number) => {
  const chatScrollRef = useChatScrollContext();
  return useAuthMutation(SEND_MESSAGE, {
    onError: (err) => toast.error(err.message ?? ERROR_MESSAGE),
    update(cache, { data }) {
      cache.updateQuery({ query: GET_CHAT_MESSAGES, variables: { channelId } }, (existing) => {
        const existingMessages = existing ? existing?.getMessages.messages : [];
        return { getMessages: { ...existing?.getMessages, messages: [...existingMessages, data.sendMessage] } };
      });

      setTimeout(() => {
        if (chatScrollRef.current) chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
      }, 200);
    },
  });
};

export default useSendMessage;
