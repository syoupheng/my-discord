import { gql } from "@apollo/client";
import { Editor, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import useAuthMutation from "../auth/useAuthMutation";

const SEND_MESSAGE = gql`
  mutation sendMessage($input: SendMessageInput!) {
    sendMessage(sendMessageInput: $input) {
      id
      type
      createdAt
      editedAt
      content
      channelId
      author {
        id
        username
        createdAt
      }
      referencedMessage {
        id
        content
        author {
          id
          username
          createdAt
        }
        mentions {
          id
          username
          createdAt
        }
      }
      mentions {
        id
        username
        createdAt
      }
    }
  }
`;

interface SendMessageInput {
  channelId: number;
  content: string;
}

const useSendMessage = (editor: ReactEditor) => {
  return useAuthMutation<any, { input: SendMessageInput }>(SEND_MESSAGE, {
    onCompleted: () => {
      Transforms.delete(editor, {
        at: {
          anchor: Editor.start(editor, []),
          focus: Editor.end(editor, []),
        },
      });
    },
  });
};

export default useSendMessage;
