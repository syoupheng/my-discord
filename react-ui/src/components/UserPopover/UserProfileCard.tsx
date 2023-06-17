import UserStatusSelection from "@/components/UserPopover/UserStatusSelection";
import BigUserAvatar from "@/components/shared/BigUserAvatar";
import { PopoverCloseFunction } from "@/components/shared/MyPopover";
import { UserStatus } from "@/gql/graphql";
import { formatUserSubscribeDate } from "@/utils/dates";

type Props = {
  avatarColor: string;
  status: UserStatus;
  username: string;
  discriminator: string;
  createdAt: string;
  closePopover: PopoverCloseFunction;
};

const UserProfileCard = ({ avatarColor, status, username, discriminator, createdAt, closePopover }: Props) => {
  return (
    <div>
      <div className="h-14 mb-8 min-w-[335px] rounded-t-md relative" style={{ backgroundColor: avatarColor }}>
        <div className="absolute bottom-0 left-4 translate-y-1/2">
          <BigUserAvatar avatarColor={avatarColor} status={status} />
        </div>
      </div>
      <div className="p-4">
        <div className="bg-tertiary rounded-md px-3 overflow-hidden">
          <div className="text-xl font-bold py-3 overflow-hidden whitespace-nowrap text-ellipsis text-white">
            <span>{username}</span>
            <span className="text-h-secondary">#{discriminator}</span>
          </div>
          <div className="border-t border-grey-border pt-2">
            <div className="my-1">
              <div className="text-white uppercase font-bold text-xs mb-2">Membre Discord depuis</div>
              <div className="text-secondary-light text-btw-sm-xs">{formatUserSubscribeDate(createdAt)}</div>
            </div>
            <UserStatusSelection closePopover={closePopover} userStatus={status} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
