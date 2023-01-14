import { useRef } from "react";
import MessageLineSkeletonContainer from "./MessageLineSkeletonContainer";
import MessageSkeletonHeader from "./MessageSkeletonHeader";
import MessageSkeletonLine from "./MessageSkeletonLine";

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
