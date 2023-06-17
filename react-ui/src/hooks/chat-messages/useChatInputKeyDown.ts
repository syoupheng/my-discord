import { ChannelMemberFragment, MessageFragment, SendMessageInput } from "@/gql/graphql";
import useAuthUserInfo from "@/hooks/auth/useAuthUserInfo";
import useMessageReply from "@/hooks/chat-messages/useMessageReply";
import useSendMessage from "@/hooks/chat-messages/useSendMessage";
import { serialize } from "@/utils/slate";
import { Descendant, Editor, Transforms } from "slate";

type Args = {
  channelId: string;
  editor: Editor;
  mentionsAutocompleteControls: (e: KeyboardEvent) => void;
  showMentionsAutocomplete: boolean;
  inputValue: Descendant[];
  mentions: ChannelMemberFragment[];
};

const useChatInputKeyDown = ({ channelId, editor, showMentionsAutocomplete, mentionsAutocompleteControls, inputValue, mentions }: Args) => {
  const authUser = useAuthUserInfo();
  const [sendMessage] = useSendMessage(parseInt(channelId));
  const { replyMessageId, setReplyMessageId } = useMessageReply();
  const handleKeyDown = async (event: KeyboardEvent) => {
    if (showMentionsAutocomplete) {
      mentionsAutocompleteControls(event);
    } else {
      switch (event.key) {
        case "Enter":
          if (event.shiftKey) break;
          event.preventDefault();
          const content = serialize(inputValue);
          if (content.length > 0) {
            const input: SendMessageInput = { content, channelId: parseInt(channelId) };
            if (replyMessageId) input.respondsToId = replyMessageId;
            setReplyMessageId(null);
            Transforms.delete(editor, {
              at: {
                anchor: Editor.start(editor, []),
                focus: Editor.end(editor, []),
              },
            });
            sendMessage({
              variables: { input },
              optimisticResponse: {
                sendMessage: {
                  id: "temp-id",
                  __typename: "Message",
                  type: "NORMAL",
                  createdAt: new Date().toISOString(),
                  editedAt: new Date().toISOString(),
                  referencedMessage: null,
                  ...input,
                  author: { ...authUser, __typename: "ChannelMember" },
                  mentions,
                } as Omit<MessageFragment, "id"> & { id: number | string },
              },
            });
          }
          break;
      }
    }
  };
  return handleKeyDown;
};

export default useChatInputKeyDown;
