import { useApolloClient } from "@apollo/client";
import { Editor, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { MESSAGE_INFO } from "../../fragments/messages";
import { graphql, useFragment } from "../../gql";
import { Message } from "../../gql/graphql";
import useAuthMutation from "../auth/useAuthMutation";
import { GET_CHAT_MESSAGES } from "./useChatMessages";
import useChatScrollContext from "./useChatScrollContext";

const SEND_MESSAGE = graphql(`
  mutation sendMessage($input: SendMessageInput!) {
    sendMessage(sendMessageInput: $input) {
      ...MessageInfo
    }
  }
`);

const useSendMessage = (channelId: number, editor: ReactEditor) => {
  // const client = useApolloClient();
  const chatScrollRef = useChatScrollContext();
  return useAuthMutation(SEND_MESSAGE, {
    onCompleted: () => {
      Transforms.delete(editor, {
        at: {
          anchor: Editor.start(editor, []),
          focus: Editor.end(editor, []),
        },
      });
      // const cacheId = { query: GET_CHAT_MESSAGES, variables: { channelId } };
      // const existing = client.readQuery(cacheId);
      // const existingMessages = existing ? useFragment(MESSAGE_INFO, existing?.getMessages.messages) : [];
      // client.writeQuery({
      //   ...cacheId,
      //   data: {
      //     getMessages: {
      //       ...existing?.getMessages,
      //       messages: [...existingMessages, data.sendMessage],
      //     },
      //   },
      // });
    },
    update(cache, { data }) {
      cache.updateQuery({ query: GET_CHAT_MESSAGES, variables: { channelId } }, (existing) => {
        const existingMessages = existing ? useFragment(MESSAGE_INFO, existing?.getMessages.messages) : [];
        return { getMessages: { ...existing?.getMessages, messages: [...existingMessages, data.sendMessage] } };
      });

      setTimeout(() => {
        if (chatScrollRef.current) chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
      }, 200);
    },
  });
};

export default useSendMessage;
