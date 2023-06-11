import FriendRequestsCount from "@/components/FriendRequestsCount";
import FriendsIcon from "@/components/FriendsPage/FriendIcon";
import AddFriendButton from "@/components/FriendsPage/FriendsNav/AddFriendButton";
import AddNewGroupButton from "@/components/FriendsPage/FriendsNav/AddNewGroupButton";
import BasicFriendsNavLink from "@/components/FriendsPage/FriendsNav/BasicFriendsNavLink";

const FriendsNav = () => {
  return (
    <section className="h-12 flex items-center px-2 border-b-[1px] border-tertiary text-h-secondary">
      <div className="flex flex-auto items-center overflow-hidden">
        <FriendsIcon className="mx-2" />
        <h3 className="font-bold text-white mr-2">Amis</h3>
        <div className="w-px h-6 mx-2 shrink-0 grow-0 bg-grey-hov"></div>
        <div className="flex">
          <BasicFriendsNavLink tab="ONLINE" />
          <BasicFriendsNavLink tab="ALL" />
          <BasicFriendsNavLink tab="PENDING">
            <FriendRequestsCount className="ml-2" />
          </BasicFriendsNavLink>
          <AddFriendButton />
        </div>
      </div>
      <AddNewGroupButton />
    </section>
  );
};

export default FriendsNav;
