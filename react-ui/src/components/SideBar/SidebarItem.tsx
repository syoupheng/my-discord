import { ReactNode } from "react";
import NotificationCounter from "../shared/NotificationCounter";
import TooltipWrapper from "../shared/TooltipWrapper";

type HoverVariant = "blue" | "green";

type Variant = "blue" | "primary" | "red";

interface Props {
  children: ReactNode;
  active?: boolean;
  tooltipTxt: string;
  onClick?: (() => any) | undefined;
  hoverVariant?: HoverVariant;
  variant?: Variant;
  count?: number | undefined | null;
}

const hoverVariantMap = new Map<HoverVariant, string>([
  ["blue", "hover:bg-blue"],
  ["green", "hover:bg-status-green"],
]);

const variantMap = new Map<Variant, string>([
  ["primary", "bg-primary"],
  ["blue", "bg-blue"],
  ["red", "bg-red"],
]);

const SidebarItem = ({ children, active = false, tooltipTxt, onClick, hoverVariant, variant = "primary", count }: Props) => {
  return (
    <TooltipWrapper tooltipTxt={tooltipTxt} direction="right" gap={3}>
      <div
        onClick={onClick}
        className={`${
          active
            ? `rounded-xl ${variantMap.get("blue")}`
            : `${variantMap.get(variant)} rounded-3xl hover:rounded-xl ${hoverVariant ? hoverVariantMap.get(hoverVariant) : ""}`
        } relative shrink-0 flex items-center justify-center h-12 w-12 my-2 mx-auto text-white cursor-pointer transition-all ease-linear duration-100 group`}
      >
        {children}
        {!!count && (
          <div className="border-4 border-tertiary rounded-full absolute -bottom-1 -right-1">
            <NotificationCounter count={count} />
          </div>
        )}
      </div>
    </TooltipWrapper>
  );
};

export default SidebarItem;
