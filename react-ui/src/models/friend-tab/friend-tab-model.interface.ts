import { FriendFragment, FriendRequestFragment } from "@/gql/graphql";
import { FriendsTabValue } from "@/providers/FriendsTabProvider";

export type EmptyFriendTabImage = {
  imageUrl: string;
  text: string;
  height: string;
  width: string;
};

export interface FriendTabModel {
  get tabValue(): FriendsTabValue;

  get listHeader(): string;

  get listItems(): FriendFragment[] | FriendRequestFragment[];

  get emptyImage(): EmptyFriendTabImage;
}
