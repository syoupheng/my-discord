import useAuthUser from "../../hooks/auth/useAuthUser";
import MessageRoomItem from "./MessageRoomItem";

const MessageRoomList = () => {
  const { data } = useAuthUser();
  if (!data) return null;
  const { privateConversations, privateGroups } = data.me;
  const items = [...privateConversations, ...privateGroups].sort(
    (item1, item2) => new Date(item2.createdAt).getTime() - new Date(item1.createdAt).getTime()
  );

  return (
    <>
      {items.map((item) => (
        <MessageRoomItem key={item.id} room={item} />
      ))}
    </>
  );
};

export default MessageRoomList;
