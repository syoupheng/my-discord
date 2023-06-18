import NotificationCounter from "@/components/shared/NotificationCounter";
import useFriendRequests from "@/hooks/friend-requests/useFriendRequests";

type Props = {
  className?: string;
}

const FriendRequestsCount = ({ className = "" }: Props) => {
  const friendRequests = useFriendRequests();
  const requestsReceived = friendRequests.filter((friendRequest) => friendRequest.requestStatus === "RECEIVED");
  if (requestsReceived.length <= 0) return null;
  return (
    <div className={className}>
      <NotificationCounter count={requestsReceived.length} />
    </div>
  );
};

export default FriendRequestsCount;
