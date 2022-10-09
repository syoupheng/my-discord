import useFriendsTab from "../../hooks/friendsNavTab/useFriendsTab";
import FriendsIcon from "./FriendIcon";
import FriendsNavlink from "./FriendsNavlink";
import NewPrivateGroupIcon from "./NewPrivateGroupIcon";

const FriendsNav = () => {
  return (
    <section className="h-12 flex items-center px-2 border-b-[1px] border-tertiary text-h-secondary">
      <div className="flex flex-auto items-center overflow-hidden">
        <FriendsIcon className="mx-2" />
        <h3 className="font-bold text-white mr-2">Amis</h3>
        <div className="w-px h-6 mx-2 shrink-0 grow-0 bg-grey-hov"></div>
        <div className="flex">
          <FriendsNavlink tab="ONLINE" />
          <FriendsNavlink tab="ALL" />
          <FriendsNavlink tab="PENDING" />
          <FriendsNavlink tab="BLOCKED" />
          <div className="mx-2 px-2 text-center align-middle min-w-[40px] shrink-0 rounded font-medium text-btw-base-sm text-white bg-green-700 cursor-pointer">
            Ajouter un ami
          </div>
        </div>
      </div>
      <div className="shrink-0 mx-2">
        <NewPrivateGroupIcon />
      </div>
    </section>
  );
};

export default FriendsNav;
