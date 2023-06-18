import MessageLineSkeletonContainer from "@/components/ChatSection/LoadingSkeleton/MessageLineSkeletonContainer";
import MessageSkeletonHeader from "@/components/ChatSection/LoadingSkeleton/MessageSkeletonHeader";
import MessageSkeletonLine from "@/components/ChatSection/LoadingSkeleton/MessageSkeletonLine";
import { useRef } from "react";


const MessageItemSkeleton = () => {
  const numLines = useRef(Math.floor(Math.random() * 3) + 1);
  return (
    <>
      <MessageSkeletonHeader />
      {[...Array(numLines.current)].map((_, idx) => (
        <MessageLineSkeletonContainer key={idx}>
          <MessageSkeletonLine />
        </MessageLineSkeletonContainer>
      ))}
    </>
  );
};

export default MessageItemSkeleton;
