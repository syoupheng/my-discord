import { UserStatus } from "../../types/user";
import AvatarIconHole from "../Icons/AvatarIconHole";
import UserStatusIcon from "./UserStatusIcon";

interface Props {
  className?: string;
  status?: UserStatus;
}

const BigUserAvatar = ({ className, status = "INVISIBLE" }: Props) => {
  return (
    <div className={`relative rounded-full border-[6px] border-secondary-alt bg-secondary-alt  ${className}`}>
      <AvatarIconHole size={65} />
      <div className={`absolute bottom-[5px] -right-[3px] overflow-hidden`}>
        <UserStatusIcon size={19} status={status} />
      </div>
    </div>
  );
};

export default BigUserAvatar;
