import useAuthUser from "../../hooks/auth/useAuthUser";
import PrivateConversationItem from "./PrivateConversationItem";
import PrivateGroupItem from "./PrivateGroupItem";

const MessageRoomList = () => {
  const { data } = useAuthUser();
  if (!data) return null;
  const { privateConversations, privateGroups, friends } = data.me;
  const items = [...privateConversations, ...privateGroups].sort(
    (item1, item2) => new Date(item2.createdAt).getTime() - new Date(item1.createdAt).getTime()
  );

  return (
    <>
      {items.map((item) =>
        item.__typename === "PrivateConversation" ? (
          <PrivateConversationItem key={`conversation:${item.id}`} conversation={item} friends={friends} />
        ) : (
          <PrivateGroupItem key={`group:${item.id}`} group={item} />
        )
      )}
    </>
  );
};

export default MessageRoomList;
