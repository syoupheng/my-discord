import { createContext, PropsWithChildren, useState } from "react";

export const FRIENDS_TAB_VALUE = {
  ALL: "ALL",
  ONLINE: "ONLINE",
  PENDING: "PENDING",
  // BLOCKED: "BLOCKED",
  ADD_FRIEND: "ADD_FRIEND",
} as const;

type ObjectValues<T> = T[keyof T];

export type FriendsTabValue = ObjectValues<typeof FRIENDS_TAB_VALUE>;

type TFriendsTabContext = [FriendsTabValue, (tab: FriendsTabValue) => void];

export const FriendsTabContext = createContext<TFriendsTabContext | null>(null);

const FriendsTabProvider = ({ children }: PropsWithChildren) => {
  const [selectedTab, setSelectedTab] = useState<FriendsTabValue>("ONLINE");
  return <FriendsTabContext.Provider value={[selectedTab, setSelectedTab]}>{children}</FriendsTabContext.Provider>;
};

export default FriendsTabProvider;
