import Sidebar from "@/components/SideBar/Sidebar";
import UserInfo from "@/components/UserPopover/UserInfo";
import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

const ChannelSidebar = ({ children }: PropsWithChildren) => {
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
