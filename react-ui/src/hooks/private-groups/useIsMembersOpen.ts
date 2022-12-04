import { useContext } from "react";
import { DisplayGroupMembersContext } from "../../providers/DisplayGroupMembersProvider";

const useIsMembersOpen = () => useContext(DisplayGroupMembersContext);

export default useIsMembersOpen;
