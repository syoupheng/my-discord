import FriendsContent from "../components/FriendsPage/FriendsContent";
import FriendsNav from "../components/FriendsPage/FriendsNav";
import FriendsRightSidebar from "../components/FriendsPage/FriendsRightSidebar";
import useFriendsTab from "../hooks/friendsNavTab/useFriendsTab";
import { User } from "../types/user";
import { filterFriendsByTab } from "../utils/friends";

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
  {
    id: 3749,
    username: "sanji",
    status: "ONLINE",
    email: "",
  },
  {
    id: 37394,
    username: "chopper",
    status: "INVISIBLE",
    email: "",
  },
  {
    id: 7304,
    username: "nami",
    status: "ONLINE",
    email: "",
  },
  {
    id: 253,
    username: "shanks",
    status: "ONLINE",
    email: "",
  },
];

const FriendsPage = () => {
  const [selectedTab] = useFriendsTab();
  const selectedFriends = filterFriendsByTab(friends, selectedTab);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <FriendsNav />
      <div className="flex h-full relative" id="tooltip-container">
        <div className="flex flex-col flex-auto overflow-hidden">
          {selectedTab === "ADD_FRIEND" ? (
            <div>Add a friend</div>
          ) : selectedFriends.length > 0 ? (
            <FriendsContent friends={selectedFriends} />
          ) : (
            "No friends"
          )}
        </div>
        <FriendsRightSidebar />
      </div>
    </div>
  );
};

export default FriendsPage;
