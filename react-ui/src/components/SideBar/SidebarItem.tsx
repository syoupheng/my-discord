import { PropsWithChildren } from "react";
import clsx from "clsx";
import NotificationCounter from "@/components/shared/NotificationCounter";
import TooltipWrapper from "@/components/shared/TooltipWrapper";

type HoverVariant = "blue" | "green";

type Variant = "blue" | "primary" | "red";

type Props = PropsWithChildren & {
  active?: boolean;
  tooltipTxt: string;
  onClick?: (() => any) | undefined;
  hoverVariant?: HoverVariant;
  variant?: Variant;
  count?: number | undefined | null;
  avatarColor?: string;
};

const hoverVariantMap = new Map<HoverVariant, string>([
  ["blue", "hover:bg-blue"],
  ["green", "hover:bg-status-green"],
]);

const variantMap = new Map<Variant, string>([
  ["primary", "bg-primary"],
  ["blue", "bg-blue"],
  ["red", "bg-red"],
]);

const SidebarItem = ({ children, active = false, tooltipTxt, onClick, hoverVariant, variant = "primary", count, avatarColor }: Props) => {
  const styles = avatarColor ? { backgroundColor: avatarColor } : undefined;
  return (
    <TooltipWrapper tooltipTxt={tooltipTxt} direction="right" gap={3}>
      <div
        onClick={onClick}
        className={clsx(
          "relative shrink-0 flex items-center justify-center h-12 w-12 my-2 mx-auto text-white cursor-pointer transition-all ease-linear duration-100 group",
          active && `rounded-xl ${!avatarColor && variantMap.get("blue")}`,
          !active &&
            `${!avatarColor && variantMap.get(variant)} rounded-3xl hover:rounded-xl ${
              hoverVariant ? !avatarColor && hoverVariantMap.get(hoverVariant) : ""
            }`
        )}
        style={styles}
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
