import FriendsNav from "@/components/FriendsPage/FriendsNav/FriendsNav";
import FriendsPageContent from "@/components/FriendsPage/FriendsPageContent";
import FriendsRightSidebar from "@/components/FriendsPage/FriendsRightSidebar";
import useDocumentTitle from "@/hooks/ui/useDocumentTitle";

const FriendsPage = () => {
  useDocumentTitle("Amis");
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <FriendsNav />
      <div className="flex h-full relative">
        <div className="flex flex-col flex-auto overflow-hidden">
          <FriendsPageContent />
        </div>
        <FriendsRightSidebar />
      </div>
    </div>
  );
};

export default FriendsPage;
