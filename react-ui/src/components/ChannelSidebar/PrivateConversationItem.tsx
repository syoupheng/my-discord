import { useLocation, useNavigate } from "react-router-dom";
import useHideConversation from "../../hooks/private-conversation/useHideConversation";
import { DEFAULT_ROUTE } from "../../main";
import { PrivateConversation } from "../../types/private-conversation";
import { Friend, UserStatus } from "../../types/user";
import UserAvatar from "../shared/UserAvatar";
import ChannelSidebarItem from "./ChannelSidebarItem";
import MessageItemLabel from "./MessageItemLabel";

interface Props {
  conversation: PrivateConversation;
  friends: Friend[];
}

const PrivateConversationItem = ({ conversation, friends }: Props) => {
  const { member, id } = conversation;
  const friendStatus: UserStatus = friends.find((friend) => friend.id === member.id)?.status ?? "INVISIBLE";
  const [hideConversation] = useHideConversation(id);
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === `/channels/@me/conversations/${id}`;
  const handleClose = () => {
    if (isActive) navigate(DEFAULT_ROUTE);
    hideConversation();
  };
  return (
    <ChannelSidebarItem url={`/conversations/${id}`} onClose={handleClose} isActive={isActive}>
      <div className="flex items-center px-2">
        <UserAvatar status={friendStatus} className="mr-3 w-8 h-8 shrink-0" />
        <MessageItemLabel label={member.username} />
      </div>
    </ChannelSidebarItem>
  );
};

export default PrivateConversationItem;
