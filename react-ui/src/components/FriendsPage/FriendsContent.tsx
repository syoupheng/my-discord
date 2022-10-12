import { useState } from "react";
import { User } from "../../types/user";
import FriendsList from "./FriendsList";
import FriendsSearchbar from "./FriendsSearchbar";

interface Props {
  friends: User[];
}

const FriendsContent = ({ friends }: Props) => {
  const [search, setSearch] = useState("");
  const filteredFriends = friends.filter((friend) => friend.username.includes(search));
  return (
    <>
      <FriendsSearchbar search={search} handleChange={setSearch} />
      <FriendsList friends={filteredFriends} />
    </>
  );
};

export default FriendsContent;
