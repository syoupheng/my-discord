import useMentionAutocompleteState from "@/hooks/mentions/useMentionsAutocompleteState";
import { usePrivateChannelContext } from "@/providers/PrivateChannelProvider";
import { Editor, Transforms } from "slate";

const useMentionAutocomplete = (editor: Editor) => {
  const channel = usePrivateChannelContext();
  const [mentionAutocompleteState, dispatchMentionAutocomplete] = useMentionAutocompleteState();
  const { arrowPosition, mentionSearch } = mentionAutocompleteState;
  const mentions = channel.members.filter((member) => member.username.toLocaleLowerCase().startsWith(mentionSearch.toLocaleLowerCase()));

  const insertMention = () => {
    Transforms.delete(editor, {
      at: {
        anchor: editor.selection?.anchor!,
        focus: {
          path: editor.selection?.anchor.path ?? [0, 0],
          offset: editor.selection?.anchor.offset ? editor.selection?.anchor.offset - (mentionSearch.length + 1) : 0,
        },
      },
    });

    const { username, id } = mentions[arrowPosition];
    Transforms.insertNodes(editor, { type: "mention", tag: `${username}#${id}`, children: [{ text: "" }] });
    Transforms.move(editor, { distance: 1, unit: "offset" });
    Transforms.insertText(editor, " ");
  };

  const mentionsAutocompleteControls = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        dispatchMentionAutocomplete({ type: "KEYBOARD_NAVIGATION", arrowPosition: arrowPosition === 0 ? mentions.length - 1 : arrowPosition - 1 });
        break;
      case "ArrowDown":
        e.preventDefault();
        dispatchMentionAutocomplete({ type: "KEYBOARD_NAVIGATION", arrowPosition: arrowPosition === mentions.length - 1 ? 0 : arrowPosition + 1 });
        break;
      case "Enter":
        if (e.shiftKey) break;
        e.preventDefault();
        insertMention();
    }
  };
  return { mentionAutocompleteState, dispatchMentionAutocomplete, mentions, mentionsAutocompleteControls };
};

export default useMentionAutocomplete;
