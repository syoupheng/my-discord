import { Friend } from "../../types/user";
import FriendListItem from "./FriendListItem";
import EmptyFriends from "./EmptyFriends";

interface Props {
  friends: Friend[];
}

const FriendsList = ({ friends }: Props) => {
  return (
    <>
      {friends.length > 0 ? (
        friends.map((friend) => <FriendListItem key={friend.id} friend={friend} />)
      ) : (
        <EmptyFriends search />
      )}
    </>
  );
};

export default FriendsList;
