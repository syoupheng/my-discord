import { ComponentProps } from "react";
import clsx from "clsx";
import useFriendsTab from "@/hooks/friendsNavTab/useFriendsTab";
import { FriendsTabValue } from "@/providers/FriendsTabProvider";

const selectedTabTextMap: Record<FriendsTabValue, string> = {
  ALL: "Tous",
  ONLINE: "En ligne",
  PENDING: "En attente",
  ADD_FRIEND: "Ajouter un ami",
};

type Props = ComponentProps<"div"> & {
  tab: FriendsTabValue;
  activeStyles: string;
  nonActiveStyles: string;
};

const FriendsNavlink = ({ tab, className, activeStyles, nonActiveStyles, children }: Props) => {
  const [selectedTab, setSelectedTab] = useFriendsTab();
  const isActive = tab === selectedTab;

  return (
    <div
      role="button"
      onClick={() => setSelectedTab(tab)}
      className={clsx(
        `flex items-center justify-center mx-2 px-2 text-center align-middle min-w-[40px] shrink-0 rounded font-medium text-btw-base-sm ${className}`,
        isActive && `cursor-default ${activeStyles}`,
        !isActive && `cursor-pointer ${nonActiveStyles}`
      )}
    >
      {selectedTabTextMap[tab]}
      {children}
    </div>
  );
};

export default FriendsNavlink;
