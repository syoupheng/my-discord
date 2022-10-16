import { ReactNode } from "react";
import useTooltip from "../../hooks/ui/useTooltip";
import Tooltip from "../shared/Tooltip";

interface Props {
  icon: ReactNode;
  description?: string;
}

const FriendActionBtn = ({ icon, description = "" }: Props) => {
  const { handleHover, setIsShown, containerRef, isShown, position } = useTooltip();

  return (
    <div
      onMouseOver={handleHover}
      onMouseLeave={() => setIsShown(false)}
      ref={containerRef}
      className="cursor-pointer h-9 w-9 rounded-full text-h-secondary bg-secondary flex items-center justify-center relative mp-btn group-hover:bg-tertiary hover:text-secondary-light ml-2 first:ml-0"
    >
      {icon}
      {isShown && <Tooltip position={position} tooltipTxt={description} size="sm" />}
    </div>
  );
};

export default FriendActionBtn;
