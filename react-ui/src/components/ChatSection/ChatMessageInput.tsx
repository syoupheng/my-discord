import { useState } from "react";
import { useParams } from "react-router-dom";
import { BaseEditor, createEditor, Descendant, Transforms, Editor } from "slate";
import { ReactEditor, Slate, withReact } from "slate-react";
import useSendMessage from "../../hooks/chat-messages/useSendMessage";
import useMentionAutocomplete from "../../hooks/mentions/useMentionsAutocomplete";
import useSlateDecorator from "../../hooks/slate/useSlateDecorator";
import useClickOutside from "../../hooks/ui/useClickOutside";
import { serialize } from "../../utils/text";
import ChatSlateEditor from "./ChatSlateEditor";
import EmojiPickerBtn from "./EmojiPickerBtn";
import MentionsAutocomplete from "./MentionsAutocomplete";

const withMentions = (editor: BaseEditor & ReactEditor) => {
  const { isInline, isVoid } = editor;
  editor.isInline = (element: any) => (element.type === "mention" ? true : isInline(element));
  editor.isVoid = (element: any) => (element.type === "mention" ? true : isVoid(element));
  return editor;
};

const ChatMessageInput = () => {
  const { channelId } = useParams();
  const [editor] = useState(() => withMentions(withReact(createEditor())));
  const [value, setValue] = useState<Descendant[]>([{ type: "paragraph", children: [{ text: "" }] }]);
  const { mentionAutocompleteState, mentions, mentionsAutocompleteControls, dispatchMentionAutocomplete } = useMentionAutocomplete(editor)!;
  const { showMentionsAutocomplete, mentionSearch, arrowPosition } = mentionAutocompleteState;
  const ref = useClickOutside(() => {
    if (showMentionsAutocomplete) {
      dispatchMentionAutocomplete({ type: "CLOSE" });
      Transforms.select(editor, {
        anchor: Editor.start(editor, []),
        focus: Editor.start(editor, []),
      });
      Transforms.deselect(editor);
    }
  });
  const slateDecorator = useSlateDecorator(editor, value, mentionAutocompleteState, dispatchMentionAutocomplete);

  const [sendMessage] = useSendMessage(editor);
  const handleKeyDown = (evt: KeyboardEvent) => {
    if (showMentionsAutocomplete) {
      mentionsAutocompleteControls(evt);
    } else {
      switch (evt.key) {
        case "Enter":
          if (evt.shiftKey) break;
          evt.preventDefault();
          const content = serialize(value);
          if (content.length > 0)
            sendMessage({
              variables: {
                input: {
                  channelId: parseInt(channelId!),
                  content,
                },
              },
            });
          break;
      }
    }
  };

  const onChange = (value: Descendant[]) => {
    // const cursorAnchor = editor.selection?.anchor;
    // const nodeText = Node.string(value[cursorAnchor?.path[0] ?? 0]);
    // console.log("texte : ", nodeText);
    // handleUserMentions(nodeText, cursorAnchor?.offset ?? 0);
    setValue(value);
  };

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <form className="relative shrink-0 px-4 mt-[-8px]">
        <div ref={ref} className="mb-6 w-full indent-0 rounded-lg bg-primary relative">
          <div className="overflow-x-hidden overflow-y-scroll bg-primary-dark-560 max-h-[50vh] rounded-lg" style={{ scrollbarWidth: "none" }}>
            <div className="pl-4 flex">
              <ChatSlateEditor handleKeyDown={handleKeyDown} decorate={slateDecorator} slateValue={value} />
              <div className="flex h-11 sticky top-0 mr-1">
                <EmojiPickerBtn />
              </div>
            </div>
          </div>
          {showMentionsAutocomplete && (
            <MentionsAutocomplete arrowPosition={arrowPosition} mentions={mentions} mentionSearch={mentionSearch} slateValue={value} />
          )}
        </div>
      </form>
    </Slate>
  );
};

export default ChatMessageInput;