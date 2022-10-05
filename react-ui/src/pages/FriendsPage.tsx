import FriendListItem from "../components/FriendsPage/FriendListItem";
import FriendsNav from "../components/FriendsPage/FriendsNav";
import FriendsRightSidebar from "../components/FriendsPage/FriendsRightSidebar";
import FriendsSearchbar from "../components/FriendsPage/FriendsSearchbar";

const FriendsPage = () => {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <FriendsNav />
      <div className="flex overflow-hidden h-full">
        <div className="flex flex-col flex-auto overflow-hidden">
          <FriendsSearchbar />
          <div>
            <h2 className="mt-4 mr-5 mb-2 ml-[30px] flex-auto text-h-secondary whitespace-nowrap overflow-hidden uppercase text-xs font-medium">En ligne - 3</h2>
          </div>
          <div className="overflow-y-scroll overflow-x-hidden pr-0 pb-2 mt-2 min-h-0 flex-auto">
            <div>
              <FriendListItem />
              <FriendListItem />
              <FriendListItem />
              <FriendListItem />
            </div>
          </div>
        </div>
        <FriendsRightSidebar />
      </div>
    </div>
  );
}
 
export default FriendsPage;