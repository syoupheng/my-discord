import useTooltip from "../../hooks/ui/useTooltip";
import { MessageRoom } from "../../types/message-room";
import ChannelSidebarItem from "../ChannelSidebar/ChannelSidebarItem";
import MessageRoomItem from "../ChannelSidebar/MessageRoomItem";
import FriendRequestsCount from "../FriendRequestsCount";
import FriendsIcon from "../FriendsPage/FriendIcon";
import AddIcon from "../Icons/AddIcon";
import Tooltip from "../shared/Tooltip";
import ChannelSidebar from "../SideBar/ChannelSidebar";

const messageRooms: MessageRoom[] = [
  {
    id: 73390,
    name: "GPE-2024 les meilleurs lalalala",
    members: [
      {
        id: 5338,
        username: "toto",
        status: "INVISIBLE",
      },
      {
        id: 8340,
        username: "titi",
        status: "ONLINE",
      },
      {
        id: 83904,
        username: "lala",
        status: "DO_NOT_DISTURB",
      },
    ],
  },
  {
    id: 2283720802,
    members: [
      {
        id: 5338,
        username: "Andrei Susai",
        status: "INVISIBLE",
      },
      {
        id: 8340,
        username: "titi",
        status: "ONLINE",
      },
    ],
  },
];

const MeSidebar = () => {
  const { handleHover, setIsShown, containerRef, isShown, position } = useTooltip();

  return (
    <ChannelSidebar>
      <ul className="px-2 pt-3 mb-8">
        <ChannelSidebarItem>
          <FriendsIcon className="mr-3 ml-2 shrink-0 grow-0 flex items-center justify-center h-8 w-8" />
          <div className="whitespace-nowrap text-ellipsis overflow-hidden flex-auto flex justify-start items-center">
            <div className="flex-initial font-medium">Amis</div>
          </div>
          <FriendRequestsCount className="mr-2" />
        </ChannelSidebarItem>
        <h2 className="flex pt-4 pr-2 pb-1 pl-4 h-10 text-ellipsis overflow-hidden uppercase font-medium text-channels-default text-xs group mt-3">
          <span className="flex-1 group-hover:text-secondary-light cursor-default">Messages privés</span>
          <div
            onMouseOver={handleHover}
            onMouseLeave={() => setIsShown(false)}
            ref={containerRef}
            className="h-4 w-4 mr-[2px] grow-0 shrink cursor-pointer text-h-secondary hover:text-secondary-light"
          >
            <AddIcon size={16} />
            {isShown && <Tooltip position={position} tooltipTxt={"Créer un MP"} size="sm" />}
          </div>
        </h2>
        {messageRooms.map((room) => (
          <MessageRoomItem key={room.id} room={room} />
        ))}
      </ul>
    </ChannelSidebar>
  );
};

export default MeSidebar;
