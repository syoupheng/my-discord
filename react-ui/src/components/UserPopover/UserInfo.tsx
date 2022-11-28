import { RiSettings5Fill } from "react-icons/ri";
import Tooltip from "../shared/Tooltip";
import useTooltip from "../../hooks/ui/useTooltip";
import UserProfilePopover from "./UserProfilePopover";

const UserInfo = () => {
  const { handleHover, setIsShown, containerRef, isShown, position } = useTooltip();
  return (
    <section className="fixed bottom-0 w-[240px] bg-secondary-alt p-2 flex justify-between">
      <UserProfilePopover />
      <div className="text-h-secondary flex items-center">
        {/* <div className="cursor-pointer p-2 rounded hover:bg-grey-hov">
          <FaMicrophone size={16} />
        </div> */}
        <div
          onMouseOver={handleHover}
          onMouseLeave={() => setIsShown(false)}
          ref={containerRef}
          className="cursor-pointer p-2 rounded hover:bg-grey-hov group relative"
        >
          <RiSettings5Fill size={19} />
          {isShown && <Tooltip tooltipTxt="Paramètres utilisateur" position={position} size="sm" />}
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
