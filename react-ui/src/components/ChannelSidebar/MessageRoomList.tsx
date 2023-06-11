import PrivateConversationItem from "@/components/ChannelSidebar/PrivateConversationItem";
import PrivateGroupItem from "@/components/ChannelSidebar/PrivateGroupItem";
import useMessageRoomList from "@/hooks/private-channel/useMessageRoomList";
import { isPrivateConversation, isPrivateGroup } from "@/utils/channel";

const MessageRoomList = () => {
  const { messageRooms, friends } = useMessageRoomList();
  return (
    <>
      {messageRooms.map((item) =>
        isPrivateConversation(item) ? (
          <PrivateConversationItem key={item.id} conversation={item} friends={friends} />
        ) : isPrivateGroup(item) ? (
          <PrivateGroupItem key={item.id} group={item} />
        ) : null
      )}
    </>
  );
};

export default MessageRoomList;
