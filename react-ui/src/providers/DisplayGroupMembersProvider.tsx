import useLocalStorage from "@/hooks/shared/useLocalStorage";
import { createContext, PropsWithChildren } from "react";

type ContextValue = [boolean, (val: boolean) => void];

export const DisplayGroupMembersContext = createContext<ContextValue | null>(null);

const DisplayGroupMembersProvider = ({ children }: PropsWithChildren) => {
  const [isMembersOpen, setIsMembersOpen] = useLocalStorage("isMembersOpen", true);
  return <DisplayGroupMembersContext.Provider value={[isMembersOpen, setIsMembersOpen]}>{children}</DisplayGroupMembersContext.Provider>;
};

export default DisplayGroupMembersProvider;
