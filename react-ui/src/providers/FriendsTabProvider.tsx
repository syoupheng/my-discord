import { createContext, ReactNode, useState } from "react";

export type FriendsTabValues = "ALL" | "ONLINE" | "PENDING" | "BLOCKED" | "ADD_FRIEND";

type TFriendsTabContext = [FriendsTabValues, (tab: FriendsTabValues) => void];

export const FriendsTabContext = createContext<TFriendsTabContext | []>([]);

interface Props {
  children: ReactNode;
}

const FriendsTabProvider = ({ children }: Props) => {
  const [selectedTab, setSelectedTab] = useState<FriendsTabValues>("ONLINE");
  return <FriendsTabContext.Provider value={[selectedTab, setSelectedTab]}>{children}</FriendsTabContext.Provider>;
};

export default FriendsTabProvider;
