import { Outlet } from "react-router-dom";
import Sidebar from "../SideBar/Sidebar";
import LogoutButton from "../SideBar/LogoutButton";
import PrivateMessagesButton from "../SideBar/PrivateMessagesButton";
import UnreadMessagesList from "../SideBar/UnreadMessagesList";

const MainLayout = () => {
  return (
    <div className="flex">
      <Sidebar className="bg-tertiary w-[72px] pt-1">
        <PrivateMessagesButton />
        <UnreadMessagesList />
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
