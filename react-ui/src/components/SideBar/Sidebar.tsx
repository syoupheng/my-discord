import { ReactNode } from "react";

interface Props {
  children: ReactNode
}

const Sidebar = ({ children }: Props) => {
  return (
    <nav className="bg-dark w-[72px] h-screen fixed top-0 left-0 m-0 flex flex-col">
      {children}
    </nav>
  );
}
 
export default Sidebar;