import FriendActionBtn from "@/components/FriendsPage/FriendActionBtn";
import FriendItemContainer from "@/components/FriendsPage/FriendItemContainer";
import FriendItemTag from "@/components/FriendsPage/FriendItemTag";
import CancelIcon from "@/components/Icons/CancelIcon";
import ValidateIcon from "@/components/Icons/ValidateIcon";
import { FriendRequestFragment } from "@/gql/graphql";
import useDeleteFriendRequest from "@/hooks/friend-requests/useDeleteFriendRequest";
import useIgnoreFriendRequest from "@/hooks/friend-requests/useIgnoreFriendRequest";
import useConfirmFriend from "@/hooks/friends/useConfirmFriend";

type Props = {
  friendRequest: FriendRequestFragment;
};

const FriendRequestItem = ({ friendRequest }: Props) => {
  const [ignoreRequest] = useIgnoreFriendRequest(friendRequest.id);
  const [deleteRequest] = useDeleteFriendRequest(friendRequest.id);
  const [confirmRequest] = useConfirmFriend();

  return (
    <FriendItemContainer>
      <FriendItemTag friendRequest={friendRequest} />
      <div className="ml-2 flex">
        {friendRequest.requestStatus === "RECEIVED" ? (
          <>
            <FriendActionBtn
              action={() => confirmRequest({ variables: { friendId: friendRequest.id } })}
              icon={<ValidateIcon size={20} />}
              description="Accepter"
              hoverColor="green"
            />
            <FriendActionBtn action={ignoreRequest} icon={<CancelIcon />} description="Ignorer" hoverColor="red" />
          </>
        ) : (
          <FriendActionBtn
            action={() => deleteRequest({ variables: { friendId: friendRequest.id } })}
            icon={<CancelIcon />}
            description="Annuler"
            hoverColor="red"
          />
        )}
      </div>
    </FriendItemContainer>
  );
};

export default FriendRequestItem;
