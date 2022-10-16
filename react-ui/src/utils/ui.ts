import { TooltipDirection, TPosition } from "../types/tooltip";

export const getTooltipPositionFromDirection = (direction: TooltipDirection, rect: DOMRect) => {
  let position: TPosition;
  switch (direction) {
    case "up":
      position = {
        left: rect.x + 8,
        top: rect.y - 12 + window.scrollY,
      };
      break;
    case "down":
      position = {
        left: rect.x + 8,
        top: rect.y + rect.height + window.scrollY + 12,
      };
      break;
    case "right":
      position = {
        left: rect.x + rect.width + 5,
        top: rect.y + window.scrollY,
      };
      break;
    case "left":
      position = {
        left: rect.x,
        top: rect.y + window.scrollY,
      };
      break;
    default:
      throw new Error("No direction provided !");
  }

  return position;
};
