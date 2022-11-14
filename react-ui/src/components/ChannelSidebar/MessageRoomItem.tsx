import useAuthUser from "../../hooks/auth/useAuthUser";
import useTooltip from "../../hooks/ui/useTooltip";
import GroupIcon from "../Icons/GroupIcon";
import UserAvatar from "../shared/UserAvatar";
import Tooltip from "../shared/Tooltip";
import ChannelSidebarItem from "./ChannelSidebarItem";
import { PrivateGroup } from "../../types/private-group";
import { PrivateConversation } from "../../types/private-conversation";
import { UserStatus } from "../../types/user";

interface Props {
  room: PrivateGroup | PrivateConversation;
}

const MessageRoomItem = ({ room }: Props) => {
  const { data } = useAuthUser();
  const { handleHover, setIsShown, containerRef, isShown, position } = useTooltip();
  const isGroup = "members" in room;
  const label = isGroup ? room?.name : room.member.username;

  if (!data) return null;

  const { friends } = data.me;
  const friendStatus: UserStatus = "member" in room ? friends.find((friend) => friend.id === room.member.id)?.status ?? "INVISIBLE" : "INVISIBLE";

  return (
    <ChannelSidebarItem isGroup={isGroup} roomId={room.id} closeBtn={true}>
      <div className="flex items-center px-2">
        {!isGroup ? <UserAvatar status={friendStatus} className="mr-3 w-8 h-8 shrink-0" /> : <GroupIcon className="mr-3 w-8 h-8 shrink-0" />}
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
          {isGroup && <div className="text-xs -mt-[2px]">{room.members.length} membres</div>}
        </div>
      </div>
    </ChannelSidebarItem>
  );
};

export default MessageRoomItem;
