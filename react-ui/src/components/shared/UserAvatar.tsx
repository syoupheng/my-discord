import { UserStatus } from "../../types/user";
import AvatarIconHole from "../Icons/AvatarIconHole";
import AvatarIconNoHole from "../Icons/AvatarIconNoHole";
import UserStatusIcon from "./UserStatusIcon";

interface Props {
  className?: string;
  status?: UserStatus | null;
}

const UserAvatar = ({ className, status = null }: Props) => {
  return (
    <div className={`relative ${className}`}>
      {status ? (
        <>
          <AvatarIconHole />
          <div className={`absolute p-[3px] -bottom-[1px] -right-[5px] rounded-full h-4 w-4 flex items-center justify-center overflow-hidden`}>
            <UserStatusIcon status={status} />
          </div>
        </>
      ) : (
        <AvatarIconNoHole />
      )}
    </div>
  );
};

export default UserAvatar;
