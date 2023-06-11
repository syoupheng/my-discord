import ChatSlateEditor from "@/components/ChatSection/ChatSlateEditor";
import EmojiPickerBtn from "@/components/ChatSection/EmojiPickerBtn";
import MentionsAutocomplete from "@/components/ChatSection/MentionsAutocomplete";
import MessageResponseIndicator from "@/components/ChatSection/MessageResponseIndicator";
import UserTypingNotification from "@/components/ChatSection/UserTypingNotification";
import TooltipWrapper from "@/components/shared/TooltipWrapper";
import useChatInputKeyDown from "@/hooks/chat-messages/useChatInputKeyDown";
import useSendTypingNotification from "@/hooks/chat-messages/useSendTypingNotification";
import useMentionAutocomplete from "@/hooks/mentions/useMentionsAutocomplete";
import useSafeParams from "@/hooks/shared/useSafeParams";
import useSlateDecorator from "@/hooks/slate/useSlateDecorator";
import useClickOutside from "@/hooks/ui/useClickOutside";
import { getNodeInSelection } from "@/utils/slate";
import { useCallback, useRef, useState } from "react";
import { createEditor, Descendant, Transforms, Editor, Element, Text } from "slate";
import { Slate, withReact } from "slate-react";

const withMentions = (editor: Editor) => {
  const { isInline, isVoid } = editor;
  editor.isInline = (element: Element) => (element.type === "mention" ? true : isInline(element));
  editor.isVoid = (element: Element) => (element.type === "mention" ? true : isVoid(element));
  return editor;
};

const ChatMessageInput = () => {
  const { channelId } = useSafeParams(["channelId"]);
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
  const slateDecorator = useSlateDecorator();
  const handleUserMentions = useCallback(
    (nodeText: string, cursorPosition: number) => {
      if (!nodeText) {
        if (showMentionsAutocomplete && cursorPosition === 0) {
          dispatchMentionAutocomplete({ type: "CLOSE" });
        }
        return [];
      }
      if (nodeText[0] === "@" && !nodeText.slice(0, cursorPosition).includes(" ") && cursorPosition >= 1) {
        dispatchMentionAutocomplete({ type: "OPEN", mentionSearch: nodeText.slice(1, cursorPosition) });
      } else {
        let shouldShowAutocomplete = false;
        for (let i = cursorPosition - 1; i >= 0; i--) {
          if (nodeText[i] === "@") {
            if (nodeText[i - 1] === " ") {
              dispatchMentionAutocomplete({ type: "OPEN", mentionSearch: nodeText.slice(i + 1, cursorPosition) });
              shouldShowAutocomplete = true;
            }
            break;
          }
          if (nodeText[i] === " ") break;
        }
        if (!shouldShowAutocomplete && showMentionsAutocomplete) {
          dispatchMentionAutocomplete({ type: "CLOSE" });
        }
      }
    },
    [showMentionsAutocomplete, mentionSearch]
  );
  
  const handleKeyDown = useChatInputKeyDown({
    channelId,
    editor,
    showMentionsAutocomplete,
    mentionsAutocompleteControls,
    inputValue: value,
    mentions,
  });

  const [sendTypingNotification] = useSendTypingNotification();

  const isTyping = useRef(false);

  const slateEditorIsEmpty = (value: Descendant[]) =>
    value.length === 1 &&
    "type" in value[0] &&
    value[0].type === "paragraph" &&
    value[0].children.length === 1 &&
    "text" in value[0].children[0] &&
    value[0].children[0].text === "";

  const onChange = (value: Descendant[]) => {
    const node = getNodeInSelection(editor);
    if (node && editor.selection) {
      const cursorPosition = editor.selection.focus.offset;
      const nodeText = Text.isText(node) ? node.text : "";
      handleUserMentions(nodeText, cursorPosition);
    }
    setValue(value);
    if (!isTyping.current && !slateEditorIsEmpty(value)) {
      sendTypingNotification();
      isTyping.current = true;
      setTimeout(() => {
        isTyping.current = false;
      }, 4000);
    }
  };

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <form className="relative shrink-0 px-4 mt-[-8px]">
        <div ref={ref} className="mb-6 w-full indent-0 rounded-lg bg-primary relative">
          <MessageResponseIndicator />
          <div className="overflow-x-hidden overflow-y-scroll bg-primary-dark-560 max-h-[50vh] rounded-lg" style={{ scrollbarWidth: "none" }}>
            <div className="pl-4 flex">
              <ChatSlateEditor isEmpty={slateEditorIsEmpty(value)} handleKeyDown={handleKeyDown} decorate={slateDecorator} slateValue={value} />
              <TooltipWrapper tooltipTxt="Coming soon !">
                <div className="flex h-11 sticky top-0 mr-1">
                  <EmojiPickerBtn />
                </div>
              </TooltipWrapper>
            </div>
          </div>
          {showMentionsAutocomplete && (
            <MentionsAutocomplete arrowPosition={arrowPosition} mentions={mentions} mentionSearch={mentionSearch} slateValue={value} />
          )}
        </div>
        <UserTypingNotification />
      </form>
    </Slate>
  );
};

export default ChatMessageInput;
