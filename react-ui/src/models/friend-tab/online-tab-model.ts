import { FriendFragment } from "@/gql/graphql";
import { EmptyFriendTabImage, FriendTabModel } from "@/models/friend-tab/friend-tab-model.interface";
import { FriendsTabValue } from "@/providers/FriendsTabProvider";

export class OnlineTabModel implements FriendTabModel {
  constructor(private friends: FriendFragment[]) {}

  get tabValue(): FriendsTabValue {
    return "ONLINE";
  }

  get listHeader() {
    return "En ligne";
  }

  get listItems() {
    return this.friends.filter((friend) => friend.status !== "INVISIBLE");
  }

  get emptyImage(): EmptyFriendTabImage {
    return {
      imageUrl: "/no_friends-online.svg",
      text: "Il n'y a personne dans les parages pour jouer avec Wumpus.",
      height: "218px",
      width: "421px",
    };
  }
}
