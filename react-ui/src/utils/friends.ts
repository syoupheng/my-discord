import { FriendFragment } from "@/gql/graphql";
import { FriendsTabValue } from "@/providers/FriendsTabProvider";

export const filterFriendsByTab = (friends: FriendFragment[], selectedTab: FriendsTabValue) => {
  let selectedFriends: FriendFragment[];

  switch (selectedTab) {
    case "ALL":
      selectedFriends = [...friends];
      break;
    case "ONLINE":
      selectedFriends = friends.filter((friend) => friend.status !== "INVISIBLE");
      break;
    // case "BLOCKED":
    //   selectedFriends = [];
    //   break;
    default:
      selectedFriends = [...friends];
  }
  return selectedFriends;
};
