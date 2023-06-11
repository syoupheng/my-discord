import MessageItemSkeleton from "@/components/ChatSection/LoadingSkeleton/MessageItemSkeleton";
import { forwardRef } from "react";

const LoadingMessagesSkeleton = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="bg-primary overflow-hidden">
      {[...Array(20)].map((_, idx) => (
        <MessageItemSkeleton key={idx} />
      ))}
    </div>
  );
});

export default LoadingMessagesSkeleton;
