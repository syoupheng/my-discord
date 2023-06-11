import Tooltip from "@/components/shared/Tooltip";
import useTooltip from "@/hooks/ui/useTooltip";
import { TooltipDirection, Size } from "@/types/tooltip";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  direction?: TooltipDirection;
  tooltipTxt: string;
  size?: Size;
  className?: string;
  gap?: number;
};

const TooltipWrapper = ({ direction = "up", children, tooltipTxt, size = "md", className = "", gap = 6 }: Props) => {
  const { containerRef, handleHover, isShown, setIsShown, position } = useTooltip({ direction, gap });
  return (
    <>
      <div className={className} onMouseOver={handleHover} onMouseLeave={() => setIsShown(false)} ref={containerRef}>
        {children}
      </div>
      {isShown && <Tooltip direction={direction} tooltipTxt={tooltipTxt} position={position} size={size} />}
    </>
  );
};

export default TooltipWrapper;
