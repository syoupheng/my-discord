import TooltipWrapper from "@/components/shared/TooltipWrapper";
import { ReactNode } from "react";

type THoverColor = "normal" | "red" | "green";

const hoverColorMap: Record<THoverColor, string> = {
  normal: "hover:text-secondary-light",
  red: "hover:text-red",
  green: "hover:text-positive",
};

type Props = {
  icon: ReactNode;
  description?: string;
  hoverColor?: THoverColor;
  action?: any;
};

const FriendActionBtn = ({ icon, description = "", hoverColor = "normal", action }: Props) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        action();
      }}
      className="ml-2 first:ml-0 cursor-pointer"
    >
      <TooltipWrapper
        tooltipTxt={description}
        size="sm"
        className={`h-9 w-9 rounded-full text-h-secondary bg-secondary flex items-center justify-center relative mp-btn group-hover:bg-tertiary ${hoverColorMap[hoverColor]}`}
      >
        {icon}
      </TooltipWrapper>
    </button>
  );
};

export default FriendActionBtn;
