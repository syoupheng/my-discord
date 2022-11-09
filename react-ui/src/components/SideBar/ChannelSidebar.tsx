import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import UserInfo from "../UserPopover/UserInfo";
import Sidebar from "./Sidebar";

interface Props {
  children?: ReactNode;
}

const ChannelSidebar = ({ children }: Props) => {
  return (
    <>
      <Sidebar className="bg-secondary w-[240px] overflow-y-auto">
        {children}
        <UserInfo />
      </Sidebar>
      <Outlet />
    </>
  );
};

export default ChannelSidebar;
