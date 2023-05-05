import { ReactNode } from "react";
import useAuthUser from "../../hooks/auth/useAuthUser";
import { ConversationMember } from "../../types/private-conversation";
import { UserStatus } from "../../types/user";
import UserAvatar from "../shared/UserAvatar";

interface Props {
  member: ConversationMember;
}

const GroupMemberItem = ({ member }: Props) => {
  const { data } = useAuthUser();
  if (!data) return null;
  let userStatus: UserStatus | null = null;
  const { id: authUserId, status: authUserStatus, friends } = data.me;
  const friend = friends.find(({ id }) => member.id === id);
  if (friend) {
    userStatus = friend.status !== "INVISIBLE" ? friend.status : null;
  } else if (member.id === authUserId) {
    userStatus = authUserStatus;
  }

  return (
    <div
      className={`${
        friend && friend.status === "INVISIBLE" ? "opacity-30 hover:opacity-100" : ""
      } relative max-w-[224px] ml-2 py-[1px] rounded text-channels-default cursor-pointer hover:text-secondary-light hover:bg-mod-hov`}
    >
      <div className="flex items-center rounded px-2 h-[42px]">
        <UserAvatar avatarColor={member.avatarColor} status={userStatus} className="mr-3" />
        <div className="leading-5 whitespace-nowrap text-ellipsis overflow-hidden flex-auto min-w-0">{member.username}</div>
      </div>
    </div>
  );
};

export default GroupMemberItem;
