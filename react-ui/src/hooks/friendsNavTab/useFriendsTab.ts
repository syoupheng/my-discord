import useSafeContext from "@/hooks/shared/useSafeContext";
import { FriendsTabContext } from "@/providers/FriendsTabProvider";

const useFriendsTab = () => useSafeContext(FriendsTabContext, "useFriendsTab must be used inside of FriendsTabProvider !");

export default useFriendsTab;
