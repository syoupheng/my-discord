import { TPosition, TooltipDirection } from "@/types/tooltip";

export const getTooltipPositionFromDirection = (
  direction: TooltipDirection,
  rect: DOMRect,
  gap: number
) => {
  let position: TPosition;
  switch (direction) {
    case "up":
      position = {
        left: rect.x + rect.width / 2,
        top: rect.y - gap + window.scrollY,
      };
      break;
    case "down":
      position = {
        left: rect.x + rect.width / 2,
        top: rect.bottom + window.scrollY + gap,
      };
      break;
    case "right":
      position = {
        left: rect.right + gap,
        top: rect.y + rect.height / 2 + window.scrollY,
      };
      break;
    case "left":
      position = {
        left: rect.x - gap,
        top: rect.y + rect.height / 2 + window.scrollY,
      };
      break;
    default:
      throw new Error("No direction provided !");
  }

  return position;
};
