import useFriendRequests from "../hooks/friend-requests/useFriendRequests";

const FriendRequestsCount = () => {
  const friendRequests = useFriendRequests();
  const requestsReceived = friendRequests.filter(
    (friendRequest) => friendRequest.requestStatus === "RECEIVED"
  );

  if (requestsReceived.length <= 0) return null;
  return (
    <div className="bg-red rounded-full h-4 w-4 text-white flex items-center justify-center ml-2 font-semibold text-xs basis-auto grow-0 shrink-0">
      {requestsReceived.length}
    </div>
  );
};

export default FriendRequestsCount;
