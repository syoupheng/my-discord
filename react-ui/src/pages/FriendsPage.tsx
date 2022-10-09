import { useState } from "react";
import FriendsList from "../components/FriendsPage/FriendsList";
import FriendsNav from "../components/FriendsPage/FriendsNav";
import FriendsRightSidebar from "../components/FriendsPage/FriendsRightSidebar";
import FriendsSearchbar from "../components/FriendsPage/FriendsSearchbar";
import { User } from "../types/user";

const friends: Array<User> = [
  {
    id: 12,
    username: "pheng",
    status: "ONLINE",
    email: "",
  },
  {
    id: 34,
    username: "batman",
    status: "INACTIVE",
    email: "",
  },
  {
    id: 62,
    username: "robin",
    status: "INVISIBLE",
    email: "",
  },
  {
    id: 7,
    username: "joey",
    status: "ONLINE",
    email: "",
  },
  {
    id: 21,
    username: "ross",
    status: "DO_NOT_DISTURB",
    email: "",
  },
  {
    id: 83,
    username: "zoro",
    status: "ONLINE",
    email: "",
  },
  {
    id: 2,
    username: "luffy",
    status: "INVISIBLE",
    email: "",
  },
];

const FriendsPage = () => {
  const [search, setSearch] = useState("");
  const filteredFriends = friends.filter((friend) =>
    friend.username.includes(search)
  );
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <FriendsNav />
      <div className="flex h-full relative" id="tooltip-container">
        <div className="flex flex-col flex-auto overflow-hidden">
          <FriendsSearchbar search={search} handleChange={setSearch} />
          <FriendsList friends={filteredFriends} />
        </div>
        <FriendsRightSidebar />
      </div>
    </div>
  );
};

export default FriendsPage;
