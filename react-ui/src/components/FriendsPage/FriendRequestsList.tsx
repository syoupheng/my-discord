import FriendRequestItem from "@/components/FriendsPage/FriendRequestItem";
import { FriendRequestFragment } from "@/gql/graphql";

type Props = {
  friendRequests: FriendRequestFragment[];
};

const FriendRequestsList = ({ friendRequests }: Props) => {
  return (
    <>
      {friendRequests.map((friendRequest) => (
        <FriendRequestItem key={friendRequest.id} friendRequest={friendRequest} />
      ))}
    </>
  );
};

export default FriendRequestsList;
