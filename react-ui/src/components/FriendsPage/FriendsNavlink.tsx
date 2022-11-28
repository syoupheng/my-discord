import { ReactNode } from "react";
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
  children?: ReactNode;
}

const FriendsNavlink = ({ tab, children }: Props) => {
  const [selectedTab, setSelectedTab] = useFriendsTab();
  return (
    <div
      data-testid={tab}
      onClick={setSelectedTab && (() => setSelectedTab(tab))}
      className={`flex items-center justify-center mx-2 px-2 text-center align-middle min-w-[40px] shrink-0 rounded font-medium text-btw-base-sm ${
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
      {children}
    </div>
  );
};

export default FriendsNavlink;
