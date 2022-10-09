import useFriendsTab from "../../hooks/friendsNavTab/useFriendsTab";
import { FriendsTabValues } from "../../providers/FriendsTabProvider";

const selectedTabTextMap = {
  ALL: "Tous",
  ONLINE: "En ligne",
  PENDING: "En attente",
  BLOCKED: "Bloqué",
};

interface Props {
  tab: FriendsTabValues;
}

const FriendsNavlink = ({ tab }: Props) => {
  const [selectedTab, setSelectedTab] = useFriendsTab();
  return (
    <div
      onClick={setSelectedTab && (() => setSelectedTab(tab))}
      className={`mx-2 px-2 text-center align-middle min-w-[40px] shrink-0 rounded font-medium text-btw-base-sm
      ${
        selectedTab === tab
          ? "bg-grey-selected cursor-default text-white"
          : "cursor-pointer"
      }`}
    >
      {selectedTabTextMap[tab]}
    </div>
  );
};

export default FriendsNavlink;
