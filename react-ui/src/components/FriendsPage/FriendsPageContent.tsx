import AddFriendSection from "@/components/FriendsPage/AddFriendSection";
import EmptyFriends from "@/components/FriendsPage/EmptyFriends";
import FriendsContent from "@/components/FriendsPage/FriendsContent";
import useFriendsPage from "@/hooks/friends/useFriendsPage";

const FriendsPageContent = () => {
  const { selectedTab, friendRequests, tabModel } = useFriendsPage();
  if (selectedTab === "ADD_FRIEND") return <AddFriendSection />;
  if (!tabModel) return null;
  if (tabModel.listItems.length > 0) {
    return <FriendsContent selectedTab={selectedTab} friendTabModel={tabModel} friendRequests={friendRequests} />;
  }
  return <EmptyFriends friendTabModel={tabModel} />;
};

export default FriendsPageContent;
