import { FriendRequest } from "../../types/user";
import useFriendRequests from "./useFriendRequests";

const useCountFriendRequests = () => {
  const friendRequests = useFriendRequests();
  const requestsReceived = friendRequests.filter((friendRequest: FriendRequest) => friendRequest.requestStatus === "RECEIVED");
  return requestsReceived.length;
};

export default useCountFriendRequests;
