import AddFriendSection from "../components/FriendsPage/AddFriendSection";
import EmptyFriends from "../components/FriendsPage/EmptyFriends";
import FriendsContent from "../components/FriendsPage/FriendsContent";
import FriendsNav from "../components/FriendsPage/FriendsNav";
import FriendsRightSidebar from "../components/FriendsPage/FriendsRightSidebar";
import useAuthUser from "../hooks/auth/useAuthUser";
import useFriendsTab from "../hooks/friendsNavTab/useFriendsTab";
import useDocumentTitle from "../hooks/ui/useDocumentTitle";
import { filterFriendsByTab } from "../utils/friends";

const FriendsPage = () => {
  useDocumentTitle("Amis");
  const [selectedTab] = useFriendsTab();
  // const friends = useFriends();
  // const friendRequests = useFriendRequests();
  const { data } = useAuthUser();

  if (!data) return null;
  const { friends, friendRequests } = data.me;

  const selectedFriends = filterFriendsByTab(friends, selectedTab);
  const friendItems = selectedTab === "PENDING" ? friendRequests : selectedFriends;

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <FriendsNav />
      <div className="flex h-full relative" id="tooltip-container">
        <div className="flex flex-col flex-auto overflow-hidden">
          {selectedTab === "ADD_FRIEND" ? (
            <AddFriendSection />
          ) : friendItems.length <= 0 ? (
            <EmptyFriends />
          ) : (
            <FriendsContent selectedTab={selectedTab} selectedFriends={selectedFriends} friendRequests={friendRequests} />
          )}
        </div>
        <FriendsRightSidebar />
      </div>
    </div>
  );
};

export default FriendsPage;
