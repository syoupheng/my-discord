import WordSkeleton from "@/components/ChatSection/LoadingSkeleton/WordSkeleton";
import { useRef } from "react";

const MessageSkeletonLine = () => {
  const numWords = useRef(Math.floor(Math.random() * 6) + 2);
  return (
    <div className="flex items-center h-[1.375rem] overflow-hidden flex-wrap indent-0">
      {[...Array(numWords.current)].map((_, idx) => (
        <WordSkeleton key={idx} />
      ))}
    </div>
  );
};

export default MessageSkeletonLine;
