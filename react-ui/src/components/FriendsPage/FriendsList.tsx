import FriendListItem from "@/components/FriendsPage/FriendListItem";
import { FriendFragment } from "@/gql/graphql";
import usePrivateConversations from "@/hooks/private-conversation/usePrivateConversations";

type Props = {
  friends: FriendFragment[];
}

const FriendsList = ({ friends }: Props) => {
  const conversations = usePrivateConversations();
  return (
    <>
      {friends.map((friend) => {
        const conversation = conversations.find(({ member }) => member.id === friend.id);
        return <FriendListItem key={friend.id} friend={friend} conversation={conversation} />;
      })}
    </>
  );
};

export default FriendsList;
