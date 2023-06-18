import TooltipWrapper from "@/components/shared/TooltipWrapper";
import UserAvatar from "@/components/shared/UserAvatar";
import { ChannelMemberFragment, UserStatus } from "@/gql/graphql";
import useAuthUserCache from "@/hooks/auth/useAuthUserCache";

type Props = {
  member: ChannelMemberFragment;
};

const GroupMemberItem = ({ member }: Props) => {
  let userStatus: UserStatus | null = null;
  const { id: authUserId, status: authUserStatus, friends } = useAuthUserCache();
  const friend = friends.find(({ id }) => member.id === id);
  if (friend) {
    userStatus = friend.status !== "INVISIBLE" ? friend.status : null;
  } else if (member.id === authUserId) {
    userStatus = authUserStatus;
  }

  return (
    <TooltipWrapper
      showOnClick
      direction="left"
      className={`${
        friend && friend.status === "INVISIBLE" ? "opacity-30 hover:opacity-100" : ""
      } relative max-w-[224px] ml-2 py-[1px] rounded text-channels-default cursor-pointer hover:text-secondary-light hover:bg-mod-hov`}
      tooltipTxt={`${member.username}#${member.discriminator}`}
    >
      <div className="flex items-center rounded px-2 h-[42px]">
        <UserAvatar avatarColor={member.avatarColor} status={userStatus} className="mr-3" />
        <div className="leading-5 whitespace-nowrap text-ellipsis overflow-hidden flex-auto min-w-0">{member.username}</div>
      </div>
    </TooltipWrapper>
  );
};

export default GroupMemberItem;
