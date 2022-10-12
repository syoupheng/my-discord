import useFriendsTab from "../../hooks/friendsNavTab/useFriendsTab";
import { FriendsTabValues } from "../../providers/FriendsTabProvider";

const selectedTabTextMap = {
  ALL: "Tous",
  ONLINE: "En ligne",
  PENDING: "En attente",
  BLOCKED: "Bloqué",
  ADD_FRIEND: "Ajouter un ami",
};

interface Props {
  tab: FriendsTabValues;
}

const FriendsNavlink = ({ tab }: Props) => {
  const [selectedTab, setSelectedTab] = useFriendsTab();
  return (
    <div
      onClick={setSelectedTab && (() => setSelectedTab(tab))}
      className={`mx-2 px-2 text-center align-middle min-w-[40px] shrink-0 rounded font-medium text-btw-base-sm ${
        tab !== "ADD_FRIEND" && "hover:bg-mod-hov"
      }
      ${
        selectedTab === tab
          ? tab !== "ADD_FRIEND"
            ? "bg-grey-selected cursor-default text-white"
            : "bg-transparent text-positive cursor-default"
          : tab !== "ADD_FRIEND"
          ? "cursor-pointer hover:text-secondary-light"
          : "text-white bg-green-700 cursor-pointer"
      }`}
    >
      {selectedTabTextMap[tab]}
    </div>
  );
};

export default FriendsNavlink;
