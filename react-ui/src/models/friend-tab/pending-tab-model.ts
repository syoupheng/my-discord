import { FriendRequestFragment } from "@/gql/graphql";
import { FriendTabModel } from "@/models/friend-tab/friend-tab-model.interface";
import { FriendsTabValue } from "@/providers/FriendsTabProvider";

export class PendingTabModel implements FriendTabModel {
  constructor(private friendRequests: FriendRequestFragment[]) {}

  get tabValue(): FriendsTabValue {
    return "PENDING";
  }

  get listHeader() {
    return "En attente";
  }

  get listItems() {
    return this.friendRequests as FriendRequestFragment[];
  }

  get emptyImage() {
    return {
      imageUrl: "/no_friends_requests.svg",
      text: "Il n'y a aucune demande d'ami en attente. Tiens, voilà Wumpus en attendant .",
      height: "200px",
      width: "415px",
    };
  }
}
