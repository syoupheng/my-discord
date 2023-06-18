import AvatarIconHole from "@/components/Icons/AvatarIconHole";
import AvatarIconNoHole from "@/components/Icons/AvatarIconNoHole";
import UserStatusIcon from "@/components/shared/UserStatusIcon";
import { UserStatus } from "@/gql/graphql";

type Sizes = "sm" | "base";

const sizeMap = new Map<Sizes, { avatarSize: number; userStatusSize: number; position: string }>([
  [
    "sm",
    {
      avatarSize: 24,
      userStatusSize: 8,
      position: "bottom-[1px] -right-[2px]",
    },
  ],
  [
    "base",
    {
      avatarSize: 32,
      userStatusSize: 10,
      position: "bottom-[2px] -right-[2px]",
    },
  ],
]);

type Props = {
  className?: string;
  status?: UserStatus | null;
  size?: Sizes;
  avatarColor?: string;
}

const UserAvatar = ({ className, status = null, size = "base", avatarColor = "#EF4444" }: Props) => {
  return (
    <div className={`relative ${className}`}>
      {status ? (
        <>
          <AvatarIconHole bgColor={avatarColor} size={sizeMap.get(size)?.avatarSize} />
          <div className={`absolute ${sizeMap.get(size)?.position} rounded-full flex items-center justify-center overflow-hidden`}>
            <UserStatusIcon status={status} size={sizeMap.get(size)?.userStatusSize} />
          </div>
        </>
      ) : (
        <AvatarIconNoHole bgColor={avatarColor} size={sizeMap.get(size)?.avatarSize} />
      )}
    </div>
  );
};

export default UserAvatar;
