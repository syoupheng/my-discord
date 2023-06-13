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
  const [ignoreRequest, { loading: ignoring }] = useIgnoreFriendRequest(friendRequest.id);
  const [deleteRequest, { loading: deleting }] = useDeleteFriendRequest(friendRequest.id);
  const [confirmRequest, { loading: confirming }] = useConfirmFriend();

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
              isLoading={confirming}
            />
            <FriendActionBtn
              action={ignoreRequest}
              icon={<CancelIcon />}
              description="Ignorer"
              hoverColor="red"
              isLoading={ignoring}
            />
          </>
        ) : (
          <FriendActionBtn
            action={() => deleteRequest({ variables: { friendId: friendRequest.id } })}
            icon={<CancelIcon />}
            description="Annuler"
            hoverColor="red"
            isLoading={deleting}
          />
        )}
      </div>
    </FriendItemContainer>
  );
};

export default FriendRequestItem;
