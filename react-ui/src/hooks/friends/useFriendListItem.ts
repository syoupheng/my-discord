import { FriendFragment, PrivateConversationFragment } from "@/gql/graphql";
import useShowConversation from "@/hooks/private-conversation/useShowConversation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useFriendListItem = (friend: FriendFragment, conversation: PrivateConversationFragment | undefined) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConversation] = useShowConversation({ friendId: friend.id, redirect: true });
  const navigate = useNavigate();
  const handleClick = () => {
    if (conversation) {
      navigate(`/channels/@me/${conversation.id}`);
    } else showConversation();
  };
  return { isOpen, setIsOpen, handleClick };
};

export default useFriendListItem;
