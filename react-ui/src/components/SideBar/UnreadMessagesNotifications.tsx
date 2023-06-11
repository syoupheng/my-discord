import UnreadMessagesList from "@/components/SideBar/UnreadMessagesList";
import useUnreadMessages from "@/hooks/chat-messages/useUnreadMessages";

const UnreadMessageNotifications = () => {
  const notificationsMap = useUnreadMessages();

  return <UnreadMessagesList countList={[...notificationsMap]} />;
};

export default UnreadMessageNotifications;
