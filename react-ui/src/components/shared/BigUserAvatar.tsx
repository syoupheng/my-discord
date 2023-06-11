import AvatarIconHole from "@/components/Icons/AvatarIconHole";
import UserStatusIcon from "@/components/shared/UserStatusIcon";
import { UserStatus } from "@/gql/graphql";

type Props = {
  className?: string;
  status?: UserStatus;
  avatarColor?: string;
}

const BigUserAvatar = ({ className, status = "INVISIBLE", avatarColor = "#EF4444" }: Props) => {
  return (
    <div className={`relative rounded-full border-[6px] border-secondary-alt bg-secondary-alt  ${className}`}>
      <AvatarIconHole bgColor={avatarColor} size={65} />
      <div className={`absolute bottom-[5px] -right-[3px] overflow-hidden`}>
        <UserStatusIcon size={19} status={status} />
      </div>
    </div>
  );
};

export default BigUserAvatar;
