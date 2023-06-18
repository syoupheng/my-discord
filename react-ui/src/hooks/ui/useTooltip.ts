import { TooltipDirection } from "@/types/tooltip";
import { getTooltipPositionFromDirection } from "@/utils/ui";
import { useRef, useState } from "react";

type Params = {
  direction?: TooltipDirection;
  gap?: number;
}

const useTooltip = ({ direction = "up", gap = 6 }: Params = { direction: "up", gap: 6 }) => {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [isShown, setIsShown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleHover = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition(getTooltipPositionFromDirection(direction, rect, gap));
      setIsShown(true);
    }
  };
  return { position, containerRef, handleHover, isShown, setIsShown };
};

export default useTooltip;
