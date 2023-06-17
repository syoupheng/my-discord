import MessageItemSkeleton from "@/components/ChatSection/LoadingSkeleton/MessageItemSkeleton";
import { Transition } from "@headlessui/react";
import { ComponentProps, forwardRef } from "react";

type Props = ComponentProps<"div"> & {
  show?: boolean;
};

const LoadingMessagesSkeleton = forwardRef<HTMLDivElement, Props>(({ show = true, className = "" }, ref) => {
  return (
    <Transition show={show} leave="transition-opacity duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
      <div ref={ref} className={`bg-primary overflow-hidden ${className}`}>
        {[...Array(20)].map((_, idx) => (
          <MessageItemSkeleton key={idx} />
        ))}
      </div>
    </Transition>
  );
});

export default LoadingMessagesSkeleton;
