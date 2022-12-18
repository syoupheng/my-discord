import { useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import useShowConversation from "../../hooks/private-conversation/useShowConversation";
import { PrivateConversation } from "../../types/private-conversation";
import { Friend } from "../../types/user";
import CancelIcon from "../Icons/CancelIcon";
import MessageIcon from "../Icons/MessageIcon";
import DeleteFriendDialog from "./DeleteFriendDialog";
import FriendActionBtn from "./FriendActionBtn";
import FriendItemContainer from "./FriendItemContainer";
import FriendItemTag from "./FriendItemTag";

interface Props {
  friend: Friend;
  conversations: PrivateConversation[];
}

const FriendListItem = ({ friend, conversations }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConversation] = useShowConversation({ friendId: friend.id, redirect: true });
  const navigate = useNavigate();
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const conversation = conversations.find(({ member }) => member.id === friend.id);
    if (conversation) {
      navigate(`/channels/@me/${conversation.id}`);
    } else showConversation();
  };

  return (
    <FriendItemContainer onClick={handleClick}>
      <FriendItemTag friend={friend} />
      <div className="ml-2 flex">
        <FriendActionBtn icon={<MessageIcon />} action={handleClick} description="Envoyer un MP" />
        <FriendActionBtn icon={<CancelIcon />} action={() => setIsOpen(true)} description="Retirer" hoverColor="red" />
        <DeleteFriendDialog friend={friend} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </FriendItemContainer>
  );
};

export default FriendListItem;
