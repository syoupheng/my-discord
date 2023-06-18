import useFriendRequests from "@/hooks/friend-requests/useFriendRequests";

const useCountFriendRequests = () => {
  const friendRequests = useFriendRequests();
  const requestsReceived = friendRequests.filter((friendRequest) => friendRequest.requestStatus === "RECEIVED");
  return requestsReceived.length;
};

export default useCountFriendRequests;
