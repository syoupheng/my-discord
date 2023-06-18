import DeleteFriendDialog from "@/components/FriendsPage/DeleteFriendDialog";
import FriendActionBtn from "@/components/FriendsPage/FriendActionBtn";
import FriendItemContainer from "@/components/FriendsPage/FriendItemContainer";
import FriendItemTag from "@/components/FriendsPage/FriendItemTag";
import CancelIcon from "@/components/Icons/CancelIcon";
import MessageIcon from "@/components/Icons/MessageIcon";
import { FriendFragment, PrivateConversationFragment } from "@/gql/graphql";
import useFriendListItem from "@/hooks/friends/useFriendListItem";

type Props = {
  friend: FriendFragment;
  conversation: PrivateConversationFragment | undefined;
};

const FriendListItem = ({ friend, conversation }: Props) => {
  const { handleClick, setIsOpen, isOpen } = useFriendListItem(friend, conversation);
  return (
    <FriendItemContainer onClick={handleClick}>
      <FriendItemTag friend={friend} />
      <div className="ml-2 flex">
        <FriendActionBtn icon={<MessageIcon />} action={handleClick} description="Envoyer un MP" />
        <FriendActionBtn icon={<CancelIcon />} action={() => setIsOpen(true)} description="Retirer" hoverColor="red" />
        <DeleteFriendDialog friend={friend} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </FriendItemContainer>
  );
};

export default FriendListItem;
