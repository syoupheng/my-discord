import { createContext, ReactNode } from "react";
import useLocalStorage from "../hooks/shared/useLocalStorage";

type TContextValue = [boolean, (val: boolean) => void];

export const DisplayGroupMembersContext = createContext<TContextValue | []>([]);

interface Props {
  children: ReactNode;
}

const DisplayGroupMembersProvider = ({ children }: Props) => {
  const [isMembersOpen, setIsMembersOpen] = useLocalStorage("isMembersOpen", true);
  return <DisplayGroupMembersContext.Provider value={[isMembersOpen, setIsMembersOpen]}>{children}</DisplayGroupMembersContext.Provider>;
};

export default DisplayGroupMembersProvider;
