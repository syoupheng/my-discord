import { ReactNode } from "react";
import useTooltip from "../../hooks/ui/useTooltip";
import Tooltip from "../shared/Tooltip";

type THoverColor = "normal" | "red" | "green";

const hoverColorMap: Record<THoverColor, string> = {
  normal: "hover:text-secondary-light",
  red: "hover:text-red",
  green: "hover:text-positive",
};

interface Props {
  icon: ReactNode;
  description?: string;
  hoverColor?: THoverColor;
  action?: any;
}

const FriendActionBtn = ({ icon, description = "", hoverColor = "normal", action }: Props) => {
  const { handleHover, setIsShown, containerRef, isShown, position } = useTooltip();

  return (
    <div
      onClick={action}
      onMouseOver={handleHover}
      onMouseLeave={() => setIsShown(false)}
      ref={containerRef}
      className={`cursor-pointer h-9 w-9 rounded-full text-h-secondary bg-secondary flex items-center justify-center relative mp-btn group-hover:bg-tertiary ml-2 first:ml-0 ${hoverColorMap[hoverColor]}`}
    >
      {icon}
      {isShown && <Tooltip position={position} tooltipTxt={description} size="sm" />}
    </div>
  );
};

export default FriendActionBtn;
