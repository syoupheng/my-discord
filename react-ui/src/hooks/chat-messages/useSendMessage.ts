import { useApolloClient } from "@apollo/client";
import { Editor, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { graphql } from "../../gql";
import useAuthMutation from "../auth/useAuthMutation";
import { GET_CHAT_MESSAGES } from "./useChatMessages";

const SEND_MESSAGE = graphql(`
  mutation sendMessage($input: SendMessageInput!) {
    sendMessage(sendMessageInput: $input) {
      ...MessageInfo
    }
  }
`);

const useSendMessage = (channelId: number, editor: ReactEditor) => {
  const client = useApolloClient();
  return useAuthMutation(SEND_MESSAGE, {
    onCompleted: (data) => {
      Transforms.delete(editor, {
        at: {
          anchor: Editor.start(editor, []),
          focus: Editor.end(editor, []),
        },
      });
      const cacheId = { query: GET_CHAT_MESSAGES, variables: { channelId } };
      const exitsing = client.readQuery(cacheId);
      client.writeQuery({
        ...cacheId,
        data: {
          getMessages: {
            ...exitsing?.getMessages,
            messages: [data.sendMessage],
          },
        },
      });
    },
    // update(cache, { data }) {
    //   cache.updateQuery({ query: GET_CHAT_MESSAGES, variables: { channelId } }, () => ({
    //     getMessages: { ...} [data.sendMessage],
    //   }));
    // },
  });
};

export default useSendMessage;
