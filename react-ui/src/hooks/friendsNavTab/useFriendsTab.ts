import { useContext } from "react";
import { FriendsTabContext } from "../../providers/FriendsTabProvider";

const useFriendsTab = () => useContext(FriendsTabContext);

export default useFriendsTab;
