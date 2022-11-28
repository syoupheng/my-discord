import { offset, useFloating } from "@floating-ui/react-dom";
import { Popover } from "@headlessui/react";
import { useLocation } from "react-router-dom";
import useTooltip from "../../hooks/ui/useTooltip";
import ChannelSidebarItem from "../ChannelSidebar/ChannelSidebarItem";
import MessageRoomList from "../ChannelSidebar/MessageRoomList";
import FriendRequestsCount from "../FriendRequestsCount";
import FriendsIcon from "../FriendsPage/FriendIcon";
import AddIcon from "../Icons/AddIcon";
import AddNewGroupPopup from "../privateGroups/AddNewGroupPopup";
import Portal from "../shared/Portal";
import Tooltip from "../shared/Tooltip";
import ChannelSidebar from "../SideBar/ChannelSidebar";

const MeSidebar = () => {
  const { handleHover, setIsShown, containerRef, isShown, position } = useTooltip();
  const {
    x: popoverX,
    y: popoverY,
    reference: popoverRef,
    floating: panelRef,
    strategy: popoverStrat,
  } = useFloating({ placement: "bottom-start", middleware: [offset(5)] });

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
        <Popover className="flex pt-4 pr-2 pb-1 pl-4 h-10 text-ellipsis overflow-hidden uppercase font-medium text-channels-default text-xs group mt-3">
          <span className="flex-1 group-hover:text-secondary-light cursor-default">Messages privés</span>
          <div
            onMouseOver={handleHover}
            onMouseLeave={() => setIsShown(false)}
            ref={containerRef}
            className="h-4 w-4 mr-[2px] grow-0 shrink cursor-pointer text-h-secondary hover:text-secondary-light"
          >
            <Popover.Button ref={popoverRef} className="focus:outline-none">
              <AddIcon size={16} />
            </Popover.Button>
            {isShown && <Tooltip position={position} tooltipTxt={"Créer un MP"} size="sm" />}
          </div>
          <Portal>
            <Popover.Panel
              ref={panelRef}
              style={{
                position: popoverStrat,
                top: popoverY ?? 0,
                left: popoverX ?? 0,
              }}
              className="z-40 bg-primary border border-gray-800 w-[440px] rounded-md drop-shadow-lg animate-fade-in"
            >
              {({ close }) => <AddNewGroupPopup closePopover={close} />}
            </Popover.Panel>
          </Portal>
        </Popover>
        <MessageRoomList />
      </ul>
    </ChannelSidebar>
  );
};

export default MeSidebar;
