import { Size, TooltipDirection, TPosition } from "../../types/tooltip";
import Portal from "./Portal";

const sizeMaps: Record<Size, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-normal",
};

// const directionMaps: Record<TooltipDirection, string> = {
//   up: "translateX(-50%)",
//   down: "translateX(-50%)",
//   left: "translateY(0)",
//   right: "translateY(0)",
// };

interface Props {
  tooltipTxt: string;
  direction?: TooltipDirection;
  size?: Size;
  position: TPosition;
}

const Tooltip = ({ tooltipTxt, direction = "up", size = "md", position }: Props) => {
  return (
    <Portal>
      <span
        className={`absolute w-auto p-2 m-2 min-w-max rounded-md shadow-md text-white bg-tertiary font-bold origin-left
        ${["up", "down"].includes(direction) ? "animate-tooltip-y" : "animate-tooltip-x"}
        ${sizeMaps[size]}`}
        style={{
          left: position.left,
          top: position.top,
          transform: ["up", "down"].includes(direction) ? "translateX(-50%) translateY(-100%)" : "",
        }}
      >
        {tooltipTxt}
      </span>
    </Portal>
  );
};

export default Tooltip;
