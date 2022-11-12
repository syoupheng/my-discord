import FriendsIcon from "./FriendIcon";
import FriendsNavlink from "./FriendsNavlink";
import NewPrivateGroupIcon from "../Icons/NewPrivateGroupIcon";
import useTooltip from "../../hooks/ui/useTooltip";
import Tooltip from "../shared/Tooltip";
import FriendRequestsCount from "../FriendRequestsCount";

const FriendsNav = () => {
  const { containerRef, handleHover, isShown, setIsShown, position } = useTooltip({
    direction: "left",
  });

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
      <div
        onMouseOver={handleHover}
        onMouseLeave={() => setIsShown(false)}
        ref={containerRef}
        className="shrink-0 mx-2 cursor-pointer hover:text-secondary-light"
      >
        {isShown && <Tooltip direction="left" tooltipTxt="Nouveau groupe privé" position={position} size="sm" />}
        <NewPrivateGroupIcon />
      </div>
    </section>
  );
};

export default FriendsNav;
