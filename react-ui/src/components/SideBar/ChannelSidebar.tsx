import Sidebar from "@/components/SideBar/Sidebar";
import UserInfo from "@/components/UserPopover/UserInfo";
import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

const ChannelSidebar = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Sidebar className={`bg-secondary w-[240px] overflow-y-auto small-scroll-container`}>
        {children}
        <div className="fixed bottom-0" style={{ width: "240px" }}>
          <UserInfo />
        </div>
      </Sidebar>
      <Outlet />
    </>
  );
};

export default ChannelSidebar;
