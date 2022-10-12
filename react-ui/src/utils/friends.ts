import { FriendsTabValues } from "../providers/FriendsTabProvider";
import { User } from "../types/user";

export const filterFriendsByTab = (friends: User[], selectedTab: FriendsTabValues | undefined) => {
  let selectedFriends: User[];

  switch (selectedTab) {
    case "ALL":
      selectedFriends = friends;
      break;
    case "ONLINE":
      selectedFriends = friends.filter((friend) => friend.status === "ONLINE");
      break;
    case "PENDING":
      selectedFriends = [];
      break;
    case "BLOCKED":
      selectedFriends = [];
      break;
    default:
      selectedFriends = [];
  }
  return selectedFriends;
};
