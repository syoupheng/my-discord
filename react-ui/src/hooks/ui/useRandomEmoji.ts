import { useState } from "react";

const NB_COLS = 11;
const NB_ROWS = 5;
const NB_EMOJIS = 50;

const useRandomEmoji = () => {
  const [emojiPosition, setEmojiPosition] = useState({ x: 0, y: 0 });
  const generateRandomEmoji = () => {
    const y = Math.floor(Math.random() * NB_ROWS);
    const x = Math.floor(Math.random() * (y === NB_ROWS - 1 ? NB_COLS - (NB_COLS * NB_ROWS - NB_EMOJIS) : NB_COLS));
    setEmojiPosition({ x, y });
  };
  return { emojiPosition, generateRandomEmoji };
};

export default useRandomEmoji;
