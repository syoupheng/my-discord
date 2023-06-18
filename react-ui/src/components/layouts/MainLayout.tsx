import LogoutButton from "@/components/SideBar/LogoutButton";
import PrivateMessagesButton from "@/components/SideBar/PrivateMessagesButton";
import Sidebar from "@/components/SideBar/Sidebar";
import UnreadMessageNotifications from "@/components/SideBar/UnreadMessagesNotifications";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex">
      <Sidebar className="bg-tertiary w-[72px] pt-1 main-sidebar">
        <PrivateMessagesButton />
        <UnreadMessageNotifications />
        <div className="my-2 flex justify-center w-[72px]">
          <div className="h-[2px] w-8 rounded-[1px] bg-background-modifier-accent" />
        </div>
        <LogoutButton />
      </Sidebar>
      <Outlet />
    </div>
  );
};

export default MainLayout;
