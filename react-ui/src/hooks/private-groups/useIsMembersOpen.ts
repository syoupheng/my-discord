import { DisplayGroupMembersContext } from "../../providers/DisplayGroupMembersProvider";
import useSafeContext from "../shared/useSafeContext";

const useIsMembersOpen = () => useSafeContext(DisplayGroupMembersContext, "useIsMembersOpen must be used inside of DisplayGroupMembersProvider !");

export default useIsMembersOpen;
