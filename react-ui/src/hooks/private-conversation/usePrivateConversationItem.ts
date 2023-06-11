import { useLocation, useNavigate } from "react-router-dom";
import { FriendFragment, PrivateConversationFragment, UserStatus } from "@/gql/graphql";
import useHideConversation from "@/hooks/private-conversation/useHideConversation";
import { DEFAULT_ROUTE } from "@/main";

const usePrivateConversationItem = (conversation: PrivateConversationFragment, friends: FriendFragment[]) => {
  const { member, id } = conversation;
  const friendStatus: UserStatus = friends.find((friend) => friend.id === member.id)?.status ?? "INVISIBLE";
  const [hideConversation] = useHideConversation(id);
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === `/channels/@me/${id}`;
  const handleClose = () => {
    if (isActive) navigate(DEFAULT_ROUTE);
    hideConversation();
  };
  return { handleClose, isActive, friendStatus, member };
};

export default usePrivateConversationItem;
