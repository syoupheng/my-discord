import { ReactNode } from "react";
import useTooltip from "../../hooks/ui/useTooltip";
import { Size, TooltipDirection } from "../../types/tooltip";
import Tooltip from "./Tooltip";

interface Props {
  direction?: TooltipDirection;
  children: ReactNode;
  tooltipTxt: string;
  size?: Size;
}

const TooltipWrapper = ({ direction = "up", children, tooltipTxt, size = "md" }: Props) => {
  const { containerRef, handleHover, isShown, setIsShown, position } = useTooltip({ direction });

  return (
    <>
      <div onMouseOver={handleHover} onMouseLeave={() => setIsShown(false)} ref={containerRef}>
        {children}
      </div>
      {isShown && <Tooltip direction={direction} tooltipTxt={tooltipTxt} position={position} size={size} />}
    </>
  );
};

export default TooltipWrapper;
