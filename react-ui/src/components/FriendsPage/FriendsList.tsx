import { Friend } from "../../types/user";
import FriendListItem from "./FriendListItem";
import EmptyFriends from "./EmptyFriends";
import usePrivateConversations from "../../hooks/private-conversation/usePrivateConversations";

interface Props {
  friends: Friend[];
}

const FriendsList = ({ friends }: Props) => {
  const { data } = usePrivateConversations();
  if (!data) return null;
  return (
    <>
      {friends.length > 0 ? (
        friends.map((friend) => <FriendListItem key={friend.id} friend={friend} conversations={data.me.privateConversations} />)
      ) : (
        <EmptyFriends search />
      )}
    </>
  );
};

export default FriendsList;
