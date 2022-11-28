import useNewFriendRequestSub from "../../hooks/friend-requests/useNewFriendRequestSub";
import { FriendRequest } from "../../types/user";
import EmptyFriends from "./EmptyFriends";
import FriendRequestItem from "./FriendRequestItem";

interface Props {
  friendRequests: FriendRequest[];
}

const FriendRequestsList = ({ friendRequests }: Props) => {
  return (
    <>
      {friendRequests.length > 0 ? (
        friendRequests.map((friendRequest) => <FriendRequestItem key={friendRequest.id} friendRequest={friendRequest} />)
      ) : (
        <EmptyFriends search />
      )}
    </>
  );
};

export default FriendRequestsList;
