import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FriendFragment, FriendRequestFragment } from "@/gql/graphql";
import EmptyFriends from "@/components/FriendsPage/EmptyFriends";
import FriendRequestsList from "@/components/FriendsPage/FriendRequestsList";
import FriendsList from "@/components/FriendsPage/FriendsList";
import FriendsSearchbar from "@/components/FriendsPage/FriendsSearchbar";
import { FriendTabModel } from "@/models/friend-tab/friend-tab-model.interface";
import { FriendsTabValue } from "@/providers/FriendsTabProvider";
import { useState } from "react";

type Props = {
  selectedTab: FriendsTabValue;
  friendRequests: FriendRequestFragment[];
  friendTabModel: FriendTabModel;
};

const FriendsContent = ({ selectedTab, friendTabModel }: Props) => {
  const [search, setSearch] = useState("");
  const lowercaseSearch = search.toLowerCase();
  const filteredFriendItems = (friendTabModel.listItems as any[]).filter((item: FriendFragment | FriendRequestFragment) => "username" in item && item.username.toLowerCase().includes(lowercaseSearch));
  // selectedTab === "PENDING"
  //   ? friendRequests.filter((item) => item.username.toLowerCase().includes(lowercaseSearch))
  //   : selectedFriends.filter((item) => item.username.toLowerCase().includes(lowercaseSearch));

  const [friendsListRef] = useAutoAnimate<HTMLDivElement>({ duration: 130 });

  return (
    <>
      <FriendsSearchbar search={search} handleChange={setSearch} />
      <div>
        <h2 className="mt-4 mr-5 mb-2 ml-[30px] flex-auto text-h-secondary whitespace-nowrap overflow-hidden uppercase text-xs font-medium">
          {selectedTab && friendTabModel.listHeader} - {filteredFriendItems.length}
        </h2>
      </div>
      <div className="relative overflow-y-scroll overflow-x-hidden pr-0 pb-2 mt-2 min-h-0 flex-auto">
        <div ref={friendsListRef} className="absolute w-full h-full">
          {filteredFriendItems.length <= 0 ? (
            <EmptyFriends search friendTabModel={friendTabModel} />
          ) : selectedTab === "PENDING" ? (
            <FriendRequestsList friendRequests={filteredFriendItems} />
          ) : (
            <FriendsList friends={filteredFriendItems} />
          )}
        </div>
      </div>
    </>
  );
};

export default FriendsContent;
