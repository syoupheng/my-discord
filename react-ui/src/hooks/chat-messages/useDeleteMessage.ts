import { useApolloClient } from "@apollo/client";
import { useParams } from "react-router-dom";
import { MESSAGE_INFO } from "../../fragments/messages";
import { graphql, useFragment } from "../../gql";
import { DeleteMessageMutation, Message, MessageInfoFragment } from "../../gql/graphql";
import useAuthMutation from "../auth/useAuthMutation";
import { GET_CHAT_MESSAGES } from "./useChatMessages";

const DELETE_MESSAGE = graphql(`
  mutation DeleteMessage($messageId: Int!) {
    deleteMessage(messageId: $messageId) {
      success
    }
  }
`);

const useDeleteMessage = (messageId: number, setModalOpen: (val: boolean) => void) => {
  const { channelId } = useParams();
  // const client = useApolloClient();
  return useAuthMutation(DELETE_MESSAGE, {
    variables: { messageId },
    // refetchQueries: [{ query: GET_CHAT_MESSAGES, variables: { channelId: parseInt(channelId!) } }],
    onCompleted: (data) => {
      if (!data.deleteMessage.success) return;
      setModalOpen(false);
      // const cacheId = { query: GET_CHAT_MESSAGES, variables: { channelId: parseInt(channelId!) } };
      // const existing = client.readQuery(cacheId);
      // if (!existing) return;
      // const existingMessages = useFragment(MESSAGE_INFO, existing.getMessages.messages);
      // client.writeQuery({
      //   ...cacheId,
      //   data: {
      //     getMessages: {
      //       ...existing.getMessages,
      //       messages: existingMessages.filter(({ id }) => id !== messageId),
      //     },
      //   },
      // });
    },
    update(cache) {
      //   cache.modify({
      //     id: cache.identify({ query: GET_CHAT_MESSAGES, variables: { channelId: parseInt(channelId!) } }),
      //     fields: {
      //       messages(existingMessages) {
      //         return existingMessages.filter((message: Message) => message.id === messageId);
      //       },
      //     },
      //   });
      cache.updateQuery({ query: GET_CHAT_MESSAGES, variables: { channelId: parseInt(channelId!) } }, (existing) => {
        if (!existing) return;
        const existingMessages = useFragment(MESSAGE_INFO, existing.getMessages.messages);
        const newMessages: MessageInfoFragment[] = [];
        existingMessages.forEach((message) => {
          if (message.id !== messageId)
            newMessages.push(message.referencedMessage?.id === messageId ? { ...message, referencedMessage: null } : { ...message });
        });
        return {
          getMessages: {
            ...existing.getMessages,
            messages: newMessages,
          },
        };
      });
    },
  });
};

export default useDeleteMessage;
