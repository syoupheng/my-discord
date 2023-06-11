import useAuthUserCache from "@/hooks/auth/useAuthUserCache";

const useMessageRoomList = () => {
  const { privateConversations, privateGroups, friends } = useAuthUserCache();
  const messageRooms = [...privateConversations, ...privateGroups].sort(
    (item1, item2) => new Date(item2.createdAt).getTime() - new Date(item1.createdAt).getTime()
  );
  return { messageRooms, friends };
};

export default useMessageRoomList;
