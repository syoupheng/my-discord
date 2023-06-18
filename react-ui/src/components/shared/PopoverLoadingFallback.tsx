import Spinner from "@/components/shared/Spinner";
import { ComponentProps } from "react";

const PopoverLoadingFallback = ({ className = "", ...props }: ComponentProps<"div">) => {
  return (
    <div className={`flex justify-center items-center ${className}`} {...props}>
      <Spinner size="lg" />
    </div>
  );
};

export default PopoverLoadingFallback;
