import FriendsIcon from "./FriendIcon";
import FriendsNavlink from "./FriendsNavlink";
import NewPrivateGroupIcon from "../Icons/NewPrivateGroupIcon";
import useTooltip from "../../hooks/ui/useTooltip";
import Tooltip from "../shared/Tooltip";
import FriendRequestsCount from "../FriendRequestsCount";
import { Popover } from "@headlessui/react";
import Portal from "../shared/Portal";
import AddNewGroupPopup from "../privateGroups/AddNewGroupPopup";
import { offset, useFloating } from "@floating-ui/react-dom";

const FriendsNav = () => {
  const { containerRef, handleHover, isShown, setIsShown, position } = useTooltip({
    direction: "left",
  });

  const {
    x: popoverX,
    y: popoverY,
    reference: popoverRef,
    floating: panelRef,
    strategy: popoverStrat,
  } = useFloating({ placement: "bottom-end", middleware: [offset(5)] });

  return (
    <section className="h-12 flex items-center px-2 border-b-[1px] border-tertiary text-h-secondary">
      <div className="flex flex-auto items-center overflow-hidden">
        <FriendsIcon className="mx-2" />
        <h3 className="font-bold text-white mr-2">Amis</h3>
        <div className="w-px h-6 mx-2 shrink-0 grow-0 bg-grey-hov"></div>
        <div className="flex">
          <FriendsNavlink tab="ONLINE" />
          <FriendsNavlink tab="ALL" />
          <FriendsNavlink tab="PENDING">
            <FriendRequestsCount className="ml-2" />
          </FriendsNavlink>
          <FriendsNavlink tab="BLOCKED" />
          <FriendsNavlink tab="ADD_FRIEND" />
        </div>
      </div>
      <Popover className="shrink-0 mx-2">
        <div
          onMouseOver={handleHover}
          onMouseLeave={() => setIsShown(false)}
          ref={containerRef}
          className="cursor-pointer hover:text-secondary-light"
        >
          {isShown && <Tooltip direction="left" tooltipTxt="Nouveau groupe privé" position={position} size="sm" />}
          <Popover.Button ref={popoverRef} className="focus:outline-none">
            <NewPrivateGroupIcon />
          </Popover.Button>
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
    </section>
  );
};

export default FriendsNav;
