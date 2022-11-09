import { Friend, FriendRequest, FriendRequestStatus, UserStatus } from "../../types/user";
import UserAvatar from "../shared/UserAvatar";

interface Props {
  friend?: Friend;
  friendRequest?: FriendRequest;
}

const userStatusMap: Record<UserStatus, { desc: string }> = {
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

const friendRequestMap: Record<FriendRequestStatus, string> = {
  RECEIVED: "Demande d'ami reçue",
  SENT: "Demande d'ami envoyée",
};

const FriendItemTag = ({ friend, friendRequest }: Props) => {
  return (
    <div className="flex overflow-hidden">
      <UserAvatar status={friend?.status} className="mr-3 w-8 h-8 shrink-0" />
      <div className="flex flex-col overflow-hidden">
        <div className="flex overflow-hidden grow items-end justify-start leading-[1.1]">
          <span className="whitespace-nowrap overflow-hidden font-semibold block flex-initial text-white">{(friend ?? friendRequest)?.username}</span>
          <span className="text-h-secondary invisible text-sm leading-4 group-hover:visible">#{(friend ?? friendRequest)?.id}</span>
        </div>
        <div className="text-h-secondary">
          <div className="whitespace-nowrap overflow-hidden text-btw-sm-xs font-medium">
            {friend ? userStatusMap[friend?.status].desc : friendRequest && friendRequestMap[friendRequest?.requestStatus]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendItemTag;
