import { User } from "../../types/user";
import DiscordAvatar from "../shared/DiscordAvatar";

interface Props {
  friend: User;
}

const userStatusMap = {
  ONLINE: {
    desc: "En ligne",
  },
  INACTIVE: {
    desc: "Inactif",
  },
  DO_NOT_DISTURB: {
    desc: "Ne pas déranger",
  },
  INVISIBLE: {
    desc: "Hors ligne",
  },
};

const FriendItemTag = ({ friend }: Props) => {
  return (
    <div className="flex overflow-hidden">
      <DiscordAvatar className="mr-3 w-8 h-8 shrink-0" />
      <div className="flex flex-col overflow-hidden">
        <div className="flex overflow-hidden grow items-end justify-start leading-[1.1]">
          <span className="whitespace-nowrap overflow-hidden font-semibold block flex-initial text-white">
            {friend.username}
          </span>
          <span className="text-h-secondary invisible text-sm leading-4 group-hover:visible">
            #{friend.id}
          </span>
        </div>
        <div className="text-h-secondary">
          <div className="whitespace-nowrap overflow-hidden text-btw-sm-xs font-medium">
            {userStatusMap[friend.status].desc}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendItemTag;
