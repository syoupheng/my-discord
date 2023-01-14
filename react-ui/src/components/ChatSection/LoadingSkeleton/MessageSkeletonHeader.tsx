import MessageLineSkeletonContainer from "./MessageLineSkeletonContainer";
import MessageSkeletonLine from "./MessageSkeletonLine";

const MessageSkeletonHeader = () => {
  return (
    <MessageLineSkeletonContainer header>
      <div className="opacity-[0.08] absolute rounded-full left-4 top-1 w-10 h-10 max-w-[40px] max-h-[40px] bg-secondary-light animate-my-pulse"></div>
      <h3 className="relative flex items-center h-[1.375rem] overflow-hidden flex-wrap leading-[1.375rem]">
        <div className="w-28 opacity-[0.14] block bg-secondary-light rounded-lg basis-auto shrink-0 grow-0 h-4 leading-[1.375rem] mt-1 animate-my-pulse"></div>
      </h3>
      <MessageSkeletonLine />
    </MessageLineSkeletonContainer>
  );
};

export default MessageSkeletonHeader;
