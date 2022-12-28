import { useReducer } from "react";

export interface IMentionAutocompleteState {
  showMentionsAutocomplete: boolean;
  mentionSearch: string;
  arrowPosition: number;
}

export type MentionAutocompleteAction =
  | { type: "OPEN"; mentionSearch: string }
  | { type: "CLOSE" }
  | { type: "KEYBOARD_NAVIGATION"; arrowPosition: number };

const mentionAutocompleteReducer = (state: IMentionAutocompleteState, action: MentionAutocompleteAction): IMentionAutocompleteState => {
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

const initialState: IMentionAutocompleteState = { showMentionsAutocomplete: false, mentionSearch: "", arrowPosition: 0 };

const useMentionAutocompleteState = () => useReducer(mentionAutocompleteReducer, initialState);

export default useMentionAutocompleteState;
