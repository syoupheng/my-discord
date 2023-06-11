import ChannelSidebarItem from "@/components/ChannelSidebar/ChannelSidebarItem";
import MessageRoomList from "@/components/ChannelSidebar/MessageRoomList";
import MessageRoomListHeader from "@/components/ChannelSidebar/MessageRoomListHeader";
import FriendRequestsCount from "@/components/FriendRequestsCount";
import FriendsIcon from "@/components/FriendsPage/FriendIcon";
import ChannelSidebar from "@/components/SideBar/ChannelSidebar";
import { useLocation } from "react-router-dom";

const MeSidebar = () => {
  const location = useLocation();
  return (
    <ChannelSidebar>
      <ul className="px-2 pt-3 mb-24">
        <ChannelSidebarItem isActive={["/channels/@me", "/channels/@me/"].includes(location.pathname)}>
          <FriendsIcon className="mr-3 ml-2 shrink-0 grow-0 flex items-center justify-center h-8 w-8" />
          <div className="whitespace-nowrap text-ellipsis overflow-hidden flex-auto flex justify-start items-center">
            <div className="flex-initial font-medium">Amis</div>
          </div>
          <FriendRequestsCount className="mr-2" />
        </ChannelSidebarItem>
        <MessageRoomListHeader />
        <MessageRoomList />
      </ul>
    </ChannelSidebar>
  );
};

export default MeSidebar;
