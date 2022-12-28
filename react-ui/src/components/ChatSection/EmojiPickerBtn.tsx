import useRandomEmoji from "../../hooks/ui/useRandomEmoji";

const EmojiPickerBtn = () => {
  const { emojiPosition, generateRandomEmoji } = useRandomEmoji();
  const { x, y } = emojiPosition;
  return (
    <div className="flex">
      <button className="cursor-pointer max-h-[50px] flex justify-center items-center p-1 mx-1 w-auto bg-transparent">
        <div
          onMouseOver={() => generateRandomEmoji()}
          className="bg-emojiFaces bg-[length:242px_110px] scale-100 grayscale hover:scale-[114%] hover:grayscale-0 bg-no-repeat h-[22px] w-[22px] transition-transform"
          style={{ backgroundPosition: `-${x * 22}px -${y * 22}px` }}
        ></div>
      </button>
    </div>
  );
};

export default EmojiPickerBtn;
