import { ReactNode } from "react";
import useTooltip from "../../hooks/ui/useTooltip";
import { TooltipDirection } from "../../types/tooltip";
import Tooltip from "../shared/Tooltip";

interface Props {
  children: ReactNode;
  active?: boolean;
  tooltipTxt: string;
  handleClick?: (() => any) | undefined;
}

const TOOLTIP_DIRECTION: TooltipDirection = "right";

const SidebarItem = ({ children, active = false, tooltipTxt, handleClick }: Props) => {
  const { handleHover, setIsShown, containerRef, isShown, position } = useTooltip({
    direction: TOOLTIP_DIRECTION,
    gap: 14,
  });

  return (
    <div
      ref={containerRef}
      onMouseOver={handleHover}
      onMouseLeave={() => setIsShown(false)}
      onClick={handleClick}
      className={`${
        active ? "bg-blue rounded-xl" : "bg-primary rounded-3xl hover:rounded-xl hover:bg-blue"
      } relative shrink-0 flex items-center justify-center h-12 w-12 my-2 mx-auto text-white cursor-pointer transition-all ease-linear duration-100 group`}
    >
      {children}
      {isShown && (
        <Tooltip tooltipTxt={tooltipTxt} position={position} direction={TOOLTIP_DIRECTION} />
      )}
    </div>
  );
};

export default SidebarItem;
