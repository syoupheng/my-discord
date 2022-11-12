import useAuthUser from "../hooks/auth/useAuthUser";
import { FriendRequest } from "../types/user";

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
    <div
      className={`${className} bg-red rounded-full h-4 w-4 text-white flex items-center justify-center font-semibold text-xs basis-auto grow-0 shrink-0`}
    >
      {requestsReceived.length}
    </div>
  );
};

export default FriendRequestsCount;
