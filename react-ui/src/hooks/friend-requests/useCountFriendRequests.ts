import { FriendRequest } from "../../types/user";
import useAuthUser from "../auth/useAuthUser";

const useCountFriendRequests = () => {
  const { data } = useAuthUser();
  if (!data) return null;
  const { friendRequests } = data.me;
  const requestsReceived = friendRequests.filter((friendRequest: FriendRequest) => friendRequest.requestStatus === "RECEIVED");
  return requestsReceived.length;
};

export default useCountFriendRequests;
