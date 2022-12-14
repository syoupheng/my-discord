import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const Sidebar = ({ children, className }: Props) => {
  return (
    <nav className={`h-screen flex flex-col shrink-0 overflow-y-scroll ${className}`}>
      {children}
    </nav>
  );
};

export default Sidebar;
