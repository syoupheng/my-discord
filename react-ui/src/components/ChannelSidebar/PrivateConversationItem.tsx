import ChannelSidebarItem from "@/components/ChannelSidebar/ChannelSidebarItem";
import MessageItemLabel from "@/components/ChannelSidebar/MessageItemLabel";
import UserAvatar from "@/components/shared/UserAvatar";
import { FriendFragment, PrivateConversationFragment } from "@/gql/graphql";
import usePrivateConversationItem from "@/hooks/private-conversation/usePrivateConversationItem";

type Props = {
  conversation: PrivateConversationFragment;
  friends: FriendFragment[];
}

const PrivateConversationItem = ({ conversation, friends }: Props) => {
  const { handleClose, isActive, member, friendStatus } = usePrivateConversationItem(conversation, friends);
  return (
    <ChannelSidebarItem url={`/${conversation.id}`} onClose={handleClose} isActive={isActive}>
      <div className="flex items-center px-2">
        <UserAvatar avatarColor={member.avatarColor} status={friendStatus} className="mr-3 w-8 h-8 shrink-0" />
        <MessageItemLabel label={member.username} />
      </div>
    </ChannelSidebarItem>
  );
};

export default PrivateConversationItem;
