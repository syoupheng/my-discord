import { MouseEventHandler, ReactNode } from "react";
import Tooltip from "../shared/Tooltip";

interface Props {
  children: ReactNode;
  active?: boolean;
  tooltipTxt: string;
  handleClick?: (() => any) | undefined;
}

const SidebarItem = ({
  children,
  active = false,
  tooltipTxt,
  handleClick,
}: Props) => {
  return (
    <div
      onClick={handleClick}
      className={`${
        active
          ? "bg-blue rounded-xl"
          : "bg-primary rounded-3xl hover:rounded-xl hover:bg-blue"
      } relative flex items-center justify-center h-12 w-12 my-2 mx-auto text-white cursor-pointer transition-all ease-linear duration-100 group`}
    >
      {children}
      <Tooltip
        tooltipTxt={tooltipTxt}
        className="left-14 origin-left text-sm"
      />
    </div>
  );
};

export default SidebarItem;
