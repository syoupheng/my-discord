import { ComponentProps } from "react";

const Sidebar = ({ children, className }: ComponentProps<"nav">) => {
  return <nav className={`h-screen flex flex-col shrink-0 overflow-y-scroll ${className}`}>{children}</nav>;
};

export default Sidebar;
