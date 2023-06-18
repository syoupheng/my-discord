import Portal from "@/components/shared/Portal";
import { Size, TooltipDirection, TPosition } from "@/types/tooltip";

const sizeMaps: Record<Size, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-normal",
};

const directionMaps: Record<TooltipDirection, { transform: string; animation: string }> = {
  up: { transform: "translateX(-50%) translateY(-100%)", animation: "animate-tooltip-up" },
  down: { transform: "translateX(-50%)", animation: "animate-tooltip-down" },
  left: { transform: "translateY(-50%) translateX(-100%)", animation: "animate-tooltip-left" },
  right: { transform: "translateY(-50%)", animation: "animate-tooltip-right" },
};

type Props = {
  tooltipTxt: string;
  direction?: TooltipDirection;
  size?: Size;
  position: TPosition;
};

const Tooltip = ({ tooltipTxt, direction = "up", size = "md", position }: Props) => {
  return (
    <Portal>
      <span
        className={`absolute w-auto p-2 min-w-max rounded-md shadow-md text-white bg-tertiary font-bold origin-left
        ${directionMaps[direction].animation}
        ${sizeMaps[size]}`}
        style={{
          left: position.left,
          top: position.top,
          transform: directionMaps[direction].transform,
          zIndex: 9999,
        }}
      >
        {tooltipTxt}
      </span>
    </Portal>
  );
};

export default Tooltip;
