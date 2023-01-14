import { useRef } from "react";

const WordSkeleton = () => {
  const width = useRef(Math.floor(Math.random() * 100) + 30);
  return (
    <div
      className="opacity-[0.06] block bg-secondary-light rounded-lg basis-auto grow-0 shrink-0 h-4 leading-[1.375rem] mt-1 ml-1 first:ml-0 w-16 animate-my-pulse"
      style={{ width: width.current }}
    ></div>
  );
};

export default WordSkeleton;
