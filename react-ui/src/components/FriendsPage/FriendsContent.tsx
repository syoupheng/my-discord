import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import { FriendsTabValues } from "../../providers/FriendsTabProvider";
import { Friend, FriendRequest } from "../../types/user";
import FriendRequestsList from "./FriendRequestsList";
import FriendsList from "./FriendsList";
import FriendsSearchbar from "./FriendsSearchbar";

const friendsStatusMap = {
  ALL: "Tous les amis",
  ONLINE: "En ligne",
  PENDING: "En attente",
  BLOCKED: "Bloqués",
  ADD_FRIEND: "",
};

interface Props {
  selectedTab: FriendsTabValues | undefined;
  selectedFriends: Friend[];
  friendRequests: FriendRequest[];
}

const FriendsContent = ({ selectedTab, selectedFriends, friendRequests }: Props) => {
  const [search, setSearch] = useState("");
  const filteredFriendItems =
    selectedTab === "PENDING"
      ? friendRequests.filter((item) => item.username.includes(search))
      : selectedFriends.filter((item) => item.username.includes(search));

  const [friendsListRef] = useAutoAnimate<HTMLDivElement>({ duration: 150 });

  return (
    <>
      <FriendsSearchbar search={search} handleChange={setSearch} />
      <div>
        <h2 className="mt-4 mr-5 mb-2 ml-[30px] flex-auto text-h-secondary whitespace-nowrap overflow-hidden uppercase text-xs font-medium">
          {selectedTab && friendsStatusMap[selectedTab]} - {filteredFriendItems.length}
        </h2>
      </div>
      <div className="relative overflow-y-scroll overflow-x-hidden pr-0 pb-2 mt-2 min-h-0 flex-auto">
        <div ref={friendsListRef} className="absolute w-full h-full">
          {selectedTab === "PENDING" ? (
            <FriendRequestsList friendRequests={filteredFriendItems as FriendRequest[]} />
          ) : (
            <FriendsList friends={filteredFriendItems as Friend[]} />
          )}
        </div>
      </div>
    </>
  );
};

export default FriendsContent;
