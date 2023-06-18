import UserAvatar from "@/components/shared/UserAvatar";
import { UserStatus } from "@/gql/graphql";

type Props = {
  avatarColor: string;
  status: UserStatus;
  username: string;
  discriminator: string;
};

const UserPopoverButton = ({ avatarColor, status, username, discriminator }: Props) => {
  return (
    <>
      <UserAvatar avatarColor={avatarColor} status={status} className="mr-2" />
      <div className="whitespace-nowrap overflow-hidden text-btw-sm-xs">
        <div className="text-white font-bold overflow-hidden text-ellipsis">{username}</div>
        <div className="text-h-secondary text-left">#{discriminator}</div>
      </div>
    </>
  );
};

export default UserPopoverButton;
