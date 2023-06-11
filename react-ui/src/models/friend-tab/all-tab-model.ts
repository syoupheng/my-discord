import { FriendFragment } from "@/gql/graphql";
import { EmptyFriendTabImage, FriendTabModel } from "@/models/friend-tab/friend-tab-model.interface";
import { FriendsTabValue } from "@/providers/FriendsTabProvider";

export class AllTabModel implements FriendTabModel {
  constructor(private friends: FriendFragment[]) {}

  get tabValue(): FriendsTabValue {
    return "ALL";
  }

  get listHeader() {
    return "Tous les amis";
  }

  get listItems() {
    return this.friends as FriendFragment[];
  }

  get emptyImage(): EmptyFriendTabImage {
    return {
      imageUrl: "/no_friends.svg",
      text: "Wumpus attend des amis. Mais rien ne t'oblige à en ajouter !",
      height: "162px",
      width: "376px",
    };
  }
}
