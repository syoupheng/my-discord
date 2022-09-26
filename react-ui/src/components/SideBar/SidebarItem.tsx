import { MouseEventHandler, ReactNode } from "react";

interface Props {
  children: ReactNode,
  active?: boolean,
  tooltipTxt?: string | null,
  handleClick?: (() => any) | undefined,
}

const SidebarItem = ({ children, active = false, tooltipTxt, handleClick }: Props) => {
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
      <span className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-dark text-sm font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100">
        {tooltipTxt}
      </span>
    </div>
  );
}
 
export default SidebarItem;