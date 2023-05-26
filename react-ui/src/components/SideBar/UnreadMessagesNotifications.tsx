import useUnreadMessages from "../../hooks/chat-messages/useUnreadMessages";
import UnreadMessagesList from "./UnreadMessagesList";

const UnreadMessageNotifications = () => {
  const notificationsMap = useUnreadMessages();

  return <UnreadMessagesList countList={[...notificationsMap]} />;
};

export default UnreadMessageNotifications;
