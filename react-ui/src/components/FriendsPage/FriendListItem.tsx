import { User } from "../../types/user";
import MessageIcon from "../Icons/MessageIcon";
import MoreOptionsIcon from "../Icons/MoreOptionsIcon";
import FriendActionBtn from "./FriendActionBtn";
import FriendItemTag from "./FriendItemTag";

interface Props {
  friend: User;
}

const FriendListItem = ({ friend }: Props) => {
  return (
    <div className="flex h-[62px] ml-[30px] mr-5 font-medium cursor-pointer group">
      <span className="group-hover:bg-mod-hov h-full w-2 rounded-l-lg bg-transparent"></span>
      <div className="flex grow items-center max-w-full justify-between border-t border-t-grey-border hover:border-t-transparent group-hover:bg-mod-hov">
        <FriendItemTag friend={friend} />
        <div className="ml-2 flex">
          <FriendActionBtn icon={<MessageIcon />} description="Envoyer un MP" />
          <FriendActionBtn icon={<MoreOptionsIcon />} description="Plus" />
        </div>
      </div>
      <span className="group-hover:bg-mod-hov h-full w-2 rounded-r-lg bg-transparent"></span>
    </div>
  );
};

export default FriendListItem;
