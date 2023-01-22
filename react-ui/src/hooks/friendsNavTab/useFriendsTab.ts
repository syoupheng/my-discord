import { FriendsTabContext } from "../../providers/FriendsTabProvider";
import useSafeContext from "../useSafeContext";

const useFriendsTab = () => useSafeContext(FriendsTabContext, "useFriendsTab must be used inside of FriendsTabProvider !");

export default useFriendsTab;
