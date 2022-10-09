import FriendListItem from "../components/FriendsPage/FriendListItem";
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
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <FriendsNav />
      <div className="flex h-full relative" id="tooltip-container">
        <div className="flex flex-col flex-auto overflow-hidden">
          <FriendsSearchbar />
          <div>
            <h2 className="mt-4 mr-5 mb-2 ml-[30px] flex-auto text-h-secondary whitespace-nowrap overflow-hidden uppercase text-xs font-medium">
              En ligne - 3
            </h2>
          </div>
          <div className="relative overflow-y-scroll overflow-x-hidden pr-0 pb-2 mt-2 min-h-0 flex-auto">
            <div className="absolute w-full">
              {friends.length > 0
                ? friends.map((friend, idx) => (
                    <FriendListItem friend={friend} index={idx} />
                  ))
                : "Vous n'avez pas d'amis pour le moment"}
            </div>
          </div>
        </div>
        <FriendsRightSidebar />
      </div>
    </div>
  );
};

export default FriendsPage;
