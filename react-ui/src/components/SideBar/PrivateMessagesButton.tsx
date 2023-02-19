import { FaDiscord } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useCountFriendRequests from "../../hooks/friend-requests/useCountFriendRequests";
import { DEFAULT_ROUTE } from "../../main";
import SidebarItem from "./SidebarItem";

const PrivateMessagesButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inPrivateMessagesChannel = location.pathname.startsWith(DEFAULT_ROUTE);
  const handleClick = () => {
    if (!inPrivateMessagesChannel) navigate(DEFAULT_ROUTE);
  };
  const friendRequestsCount = useCountFriendRequests();
  return (
    <SidebarItem tooltipTxt="Messages privés" active={inPrivateMessagesChannel} onClick={handleClick} count={friendRequestsCount}>
      <FaDiscord size={30} />
    </SidebarItem>
  );
};

export default PrivateMessagesButton;
