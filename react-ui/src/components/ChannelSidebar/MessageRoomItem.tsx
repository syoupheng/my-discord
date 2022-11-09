import useAuthUser from "../../hooks/auth/useAuthUser";
import useTooltip from "../../hooks/ui/useTooltip";
import { MessageRoom } from "../../types/message-room";
import GroupIcon from "../Icons/GroupIcon";
import UserAvatar from "../shared/UserAvatar";
import Tooltip from "../shared/Tooltip";
import ChannelSidebarItem from "./ChannelSidebarItem";

interface Props {
  room: MessageRoom;
}

const MessageRoomItem = ({ room }: Props) => {
  const { data: authUser } = useAuthUser();
  const { handleHover, setIsShown, containerRef, isShown, position } = useTooltip();
  const label = room?.name ?? room.members.find((member) => member.id !== authUser?.me.id)?.username ?? "";

  return (
    <ChannelSidebarItem roomId={room.id} closeBtn={true}>
      <div className="flex items-center px-2">
        {room.members.length === 2 ? (
          <UserAvatar status="ONLINE" className="mr-3 w-8 h-8 shrink-0" />
        ) : (
          <GroupIcon className="mr-3 w-8 h-8 shrink-0" />
        )}
        <div className="whitespace-nowrap text-ellipsis overflow-hidden flex-auto min-w-0 max-w-[165px] group-hover:max-w-[140px]">
          <div
            onMouseOver={() => !!containerRef.current && containerRef.current?.offsetWidth >= 140 && handleHover()}
            onMouseLeave={() => setIsShown(false)}
            ref={containerRef}
            className="text-btw-base-sm whitespace-nowrap text-ellipsis overflow-hidden"
          >
            {label}
          </div>
          {isShown && <Tooltip position={position} tooltipTxt={label} size="sm" />}
          {room.members.length > 2 && <div className="text-xs -mt-[2px]">{room.members.length} membres</div>}
        </div>
      </div>
    </ChannelSidebarItem>
  );
};

export default MessageRoomItem;
