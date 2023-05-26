import useAuthUserCache from "../auth/useAuthUserCache";
import { useFragment } from "../../gql";
import { FRIEND_REQUEST_FRAGMENT } from "../../fragments/auth";

const useFriendRequests = () => {
  const { friendRequests: friendRequestsFragment } = useAuthUserCache();
  const friendRequests = useFragment(FRIEND_REQUEST_FRAGMENT, friendRequestsFragment);
  return friendRequests;
};

export default useFriendRequests;
