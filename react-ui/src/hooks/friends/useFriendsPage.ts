import { FriendFragment, FriendRequestFragment } from "@/gql/graphql";
import useAuthUserCache from "@/hooks/auth/useAuthUserCache";
import useFriendsTab from "@/hooks/friendsNavTab/useFriendsTab";
import { AllTabModel } from "@/models/friend-tab/all-tab-model";
import { OnlineTabModel } from "@/models/friend-tab/online-tab-model";
import { PendingTabModel } from "@/models/friend-tab/pending-tab-model";
import { FriendsTabValue } from "@/providers/FriendsTabProvider";

export function getFriendTabModel(
  selectedTab: FriendsTabValue,
  friends: FriendFragment[] = [],
  friendRequests: FriendRequestFragment[] = []
) {
  switch (selectedTab) {
    case "ALL":
      return new AllTabModel(friends);
    case "ONLINE":
      return new OnlineTabModel(friends);
    case "PENDING":
      return new PendingTabModel(friendRequests);
    case "ADD_FRIEND":
      return undefined;
  }
}

const useFriendsPage = () => {
  const [selectedTab] = useFriendsTab();
  const { friendRequests, friends } = useAuthUserCache();
  const tabModel = getFriendTabModel(selectedTab, friends, friendRequests);
  return { selectedTab, tabModel, friendRequests };
};

export default useFriendsPage;
