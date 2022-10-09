import useFriendsTab from "../../hooks/friendsNavTab/useFriendsTab";
import { User } from "../../types/user";
import FriendListItem from "./FriendListItem";

const friendsStatusMap = {
  ALL: "Tous les amis",
  ONLINE: "En ligne",
  PENDING: "En attente",
  BLOCKED: "Bloqués",
};

interface Props {
  friends: User[];
}

const FriendsList = ({ friends }: Props) => {
  const [selectedTab] = useFriendsTab();

  let filteredFriends = friends;

  if (selectedTab) {
    switch (selectedTab) {
      case "ONLINE":
        filteredFriends = friends.filter(
          (friend) => friend.status === "ONLINE"
        );
    }
  }

  return (
    <>
      <div>
        <h2 className="mt-4 mr-5 mb-2 ml-[30px] flex-auto text-h-secondary whitespace-nowrap overflow-hidden uppercase text-xs font-medium">
          {selectedTab && friendsStatusMap[selectedTab]} -{" "}
          {filteredFriends.length}
        </h2>
      </div>
      <div className="relative overflow-y-scroll overflow-x-hidden pr-0 pb-2 mt-2 min-h-0 flex-auto">
        <div className="absolute w-full">
          {filteredFriends.length > 0
            ? filteredFriends.map((friend, idx) => (
                <FriendListItem key={friend.id} friend={friend} index={idx} />
              ))
            : "Vous n'avez pas d'amis pour le moment"}
        </div>
      </div>
    </>
  );
};

export default FriendsList;
