import { Dispatch, useCallback } from "react";
import { Descendant, Editor, NodeEntry } from "slate";
import { ReactEditor } from "slate-react";
import { findUrlsInText } from "../../utils/text";
import { IMentionAutocompleteState, MentionAutocompleteAction } from "../mentions/useMentionsAutocompleteState";

const useSlateDecorator = (
  editor: ReactEditor,
  value: Descendant[],
  mentionAutocompleteState: IMentionAutocompleteState,
  dispatchMentionAutocomplete: Dispatch<MentionAutocompleteAction>
) => {
  const { showMentionsAutocomplete, mentionSearch } = mentionAutocompleteState;

  const handleUserMentions = (nodeText: string, cursorPosition: number) => {
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
  };

  const slateDecorator = useCallback(
    ([node, path]: NodeEntry<{ text: string }>) => {
      const cursorPosition = editor.selection?.anchor.offset ?? 0;
      const nodeText: string = node.text ?? "";
      handleUserMentions(nodeText, cursorPosition);
      const urls = findUrlsInText(nodeText);
      return urls.length > 0
        ? urls.map(([url, index]) => ({
            anchor: {
              path,
              offset: index,
            },
            focus: {
              path,
              offset: index + url.length,
            },
            decoration: "link",
          }))
        : [];
    },
    [value, editor.selection?.anchor.offset, mentionSearch]
  );

  return slateDecorator;
};

export default useSlateDecorator;
