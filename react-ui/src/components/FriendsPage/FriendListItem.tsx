import { Friend, User } from "../../types/user";
import MessageIcon from "../Icons/MessageIcon";
import MoreOptionsIcon from "../Icons/MoreOptionsIcon";
import FriendActionBtn from "./FriendActionBtn";
import FriendItemContainer from "./FriendItemContainer";
import FriendItemTag from "./FriendItemTag";

interface Props {
  friend: Friend;
}

const FriendListItem = ({ friend }: Props) => {
  return (
    <FriendItemContainer>
      <FriendItemTag friend={friend} />
      <div className="ml-2 flex">
        <FriendActionBtn icon={<MessageIcon />} description="Envoyer un MP" />
        <FriendActionBtn icon={<MoreOptionsIcon />} description="Plus" />
      </div>
    </FriendItemContainer>
  );
};

export default FriendListItem;
