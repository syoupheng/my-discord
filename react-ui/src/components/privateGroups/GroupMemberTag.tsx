import { Friend } from "../../types/user";
import CloseIcon from "../Icons/CloseIcon";

interface Props {
  friend: Friend;
  handleClick: (id: number) => void;
}

const GroupMemberTag = ({ friend, handleClick }: Props) => {
  return (
    <a
      key={friend.id}
      onClick={() => handleClick(friend.id)}
      className="h-[30px] px-2 rounded-sm text-center m-[1px] leading-8 flex items-center cursor-pointer bg-primary text-secondary-light text-btw-base-sm hover:bg-mod-hov hover:text-h-secondary"
      role="button"
    >
      {friend.username}
      <div className="ml-1">
        <CloseIcon size={12} />
      </div>
    </a>
  );
};

export default GroupMemberTag;
