import UserStatusIcon from "@/components/shared/UserStatusIcon";
import { UserStatus } from "@/gql/graphql";

type Props = {
  onSelect: () => void;
  userStatus: UserStatus;
  label: string;
  description: string;
};

const StatusSelectionItem = ({ onSelect, userStatus, label, description }: Props) => {
  return (
    <li
      onClick={onSelect}
      className="first:border-b first:border-grey-border p-2 text-h-secondary hover:text-white hover:bg-blue first:mt-0 last:mb-0 my-1 cursor-pointer rounded-sm grid grid-cols-12 group/listitem"
    >
      <div className="col-span-1 my-auto">
        <UserStatusIcon status={userStatus} size={10} hoverWhite="listitem" />
      </div>
      <div className="text-btw-sm-xs col-span-11">{label}</div>
      {description !== "" && <p className="text-xxs mt-1 col-start-2 col-end-12">{description}</p>}
    </li>
  );
};

export default StatusSelectionItem;
