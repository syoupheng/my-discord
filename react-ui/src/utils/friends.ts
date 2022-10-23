import { FriendsTabValues } from "../providers/FriendsTabProvider";
import { Friend } from "../types/user";

export const filterFriendsByTab = (
  friends: Friend[],
  selectedTab: FriendsTabValues | undefined
) => {
  let selectedFriends: Friend[];

  switch (selectedTab) {
    case "ALL":
      selectedFriends = friends;
      break;
    case "ONLINE":
      selectedFriends = friends.filter((friend) => friend.status !== "INVISIBLE");
      break;
    case "BLOCKED":
      selectedFriends = [];
      break;
    default:
      selectedFriends = friends;
  }
  return selectedFriends;
};
