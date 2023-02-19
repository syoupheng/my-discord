import useAuthUser from "../hooks/auth/useAuthUser";
import { FriendRequest } from "../types/user";
import NotificationCounter from "./shared/NotificationCounter";

interface Props {
  className?: string;
}

const FriendRequestsCount = ({ className = "" }: Props) => {
  const { data } = useAuthUser();
  if (!data) return null;
  const { friendRequests } = data.me;
  const requestsReceived = friendRequests.filter((friendRequest: FriendRequest) => friendRequest.requestStatus === "RECEIVED");

  if (requestsReceived.length <= 0) return null;
  return (
    <div className={className}>
      <NotificationCounter count={requestsReceived.length} />
    </div>
  );
};

export default FriendRequestsCount;
