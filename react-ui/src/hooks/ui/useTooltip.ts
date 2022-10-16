import { useRef, useState } from "react";
import { TooltipDirection } from "../../types/tooltip";
import { getTooltipPositionFromDirection } from "../../utils/ui";

const useTooltip = (direction: TooltipDirection = "up") => {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [isShown, setIsShown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleHover = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition(getTooltipPositionFromDirection(direction, rect));
      setIsShown(true);
    }
  };
  return { position, containerRef, handleHover, isShown, setIsShown };
};

export default useTooltip;
