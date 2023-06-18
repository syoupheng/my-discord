import useSafeContext from "@/hooks/shared/useSafeContext";
import { DisplayGroupMembersContext } from "@/providers/DisplayGroupMembersProvider";

const useIsMembersOpen = () => useSafeContext(DisplayGroupMembersContext, "useIsMembersOpen must be used inside of DisplayGroupMembersProvider !");

export default useIsMembersOpen;
