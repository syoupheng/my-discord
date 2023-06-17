import Tooltip from "@/components/shared/Tooltip";
import useTooltip from "@/hooks/ui/useTooltip";
import { TooltipDirection, Size } from "@/types/tooltip";
import { ComponentProps } from "react";

type Props = ComponentProps<"div"> & {
  direction?: TooltipDirection;
  tooltipTxt: string;
  size?: Size;
  className?: string;
  gap?: number;
  showOnClick?: boolean;
};

const TooltipWrapper = ({ direction = "up", children, tooltipTxt, size = "md", gap = 6, showOnClick = false, ...props }: Props) => {
  const { containerRef, handleHover, isShown, setIsShown, position } = useTooltip({ direction, gap });
  return (
    <>
      <div
        {...props}
        onClick={showOnClick ? handleHover : undefined}
        onMouseOver={showOnClick ? undefined : handleHover}
        onMouseLeave={() => setIsShown(false)}
        ref={containerRef}
      >
        {children}
      </div>
      {isShown && <Tooltip direction={direction} tooltipTxt={tooltipTxt} position={position} size={size} />}
    </>
  );
};

export default TooltipWrapper;
