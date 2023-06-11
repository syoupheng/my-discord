import { useReducer } from "react";

export type MentionAutocompleteState = {
  showMentionsAutocomplete: boolean;
  mentionSearch: string;
  arrowPosition: number;
};

export type MentionAutocompleteAction =
  | { type: "OPEN"; mentionSearch: string }
  | { type: "CLOSE" }
  | { type: "KEYBOARD_NAVIGATION"; arrowPosition: number };

const mentionAutocompleteReducer = (state: MentionAutocompleteState, action: MentionAutocompleteAction): MentionAutocompleteState => {
  switch (action.type) {
    case "OPEN":
      return { ...state, showMentionsAutocomplete: true, mentionSearch: action.mentionSearch, arrowPosition: 0 };
    case "CLOSE":
      return { ...state, showMentionsAutocomplete: false };
    case "KEYBOARD_NAVIGATION":
      return { ...state, arrowPosition: action.arrowPosition };
    default:
      return state;
  }
};

const initialState: MentionAutocompleteState = { showMentionsAutocomplete: false, mentionSearch: "", arrowPosition: 0 };

const useMentionAutocompleteState = () => useReducer(mentionAutocompleteReducer, initialState);

export default useMentionAutocompleteState;
