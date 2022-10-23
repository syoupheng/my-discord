import useDeleteFriendRequest from "../../hooks/friend-requests/useDeleteFriendRequest";
import useConfirmFriend from "../../hooks/friends/useConfirmFriend";
import { FriendRequest } from "../../types/user";
import CancelIcon from "../Icons/CancelIcon";
import ValidateIcon from "../Icons/ValidateIcon";
import FriendActionBtn from "./FriendActionBtn";
import FriendItemContainer from "./FriendItemContainer";
import FriendItemTag from "./FriendItemTag";

interface Props {
  friendRequest: FriendRequest;
}

const FriendRequestItem = ({ friendRequest }: Props) => {
  const [deleteRequest] = useDeleteFriendRequest();
  const [confirmRequest] = useConfirmFriend();

  return (
    <FriendItemContainer>
      <FriendItemTag friendRequest={friendRequest} />
      <div className="ml-2 flex">
        {friendRequest.requestStatus === "RECEIVED" ? (
          <>
            <FriendActionBtn
              action={() => confirmRequest({ variables: { friendId: friendRequest.id } })}
              icon={<ValidateIcon />}
              description="Accepter"
              hoverColor="green"
            />
            <FriendActionBtn
              action={() => deleteRequest({ variables: { friendId: friendRequest.id } })}
              icon={<CancelIcon />}
              description="Ignorer"
              hoverColor="red"
            />
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
