import { useState } from "react";
import { Friend, User } from "../../types/user";
import CancelIcon from "../Icons/CancelIcon";
import MessageIcon from "../Icons/MessageIcon";
import DeleteFriendDialog from "./DeleteFriendDialog";
import FriendActionBtn from "./FriendActionBtn";
import FriendItemContainer from "./FriendItemContainer";
import FriendItemTag from "./FriendItemTag";

interface Props {
  friend: Friend;
}

const FriendListItem = ({ friend }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <FriendItemContainer>
      <FriendItemTag friend={friend} />
      <div className="ml-2 flex">
        <FriendActionBtn icon={<MessageIcon />} description="Envoyer un MP" />
        <FriendActionBtn icon={<CancelIcon />} action={() => setIsOpen(true)} description="Retirer" hoverColor="red" />
        <DeleteFriendDialog friend={friend} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </FriendItemContainer>
  );
};

export default FriendListItem;
