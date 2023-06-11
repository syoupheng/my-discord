import UserAvatar from "@/components/shared/UserAvatar";
import { UserStatus } from "@/gql/graphql";

type Props = {
  avatarColor: string;
  status: UserStatus;
  username: string;
  id: number;
};

const UserPopoverButton = ({ avatarColor, status, username, id }: Props) => {
  return (
    <>
      <UserAvatar avatarColor={avatarColor} status={status} className="mr-2" />
      <div className="whitespace-nowrap overflow-hidden text-btw-sm-xs">
        <div className="text-white font-bold">{username}</div>
        <div className="text-h-secondary text-left">#{id}</div>
      </div>
    </>
  );
};

export default UserPopoverButton;
