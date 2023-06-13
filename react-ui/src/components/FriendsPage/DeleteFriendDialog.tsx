import ModalDialog from "@/components/shared/ModalDialog";
import { FriendFragment } from "@/gql/graphql";
import useDeleteFriend from "@/hooks/friends/useDeleteFriend";

type Props = {
  friend: FriendFragment;
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

const DeleteFriendDialog = ({ friend, isOpen, setIsOpen }: Props) => {
  const [deleteFriend, { loading }] = useDeleteFriend(friend.id);

  const handleDelete = () => {
    // setIsOpen(false);
    deleteFriend();
  };

  return (
    <ModalDialog
      title={`Retirer ${friend.username}`}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={
        <>
          Tu es sûr(e) de vouloir retirer définitivement <span className="font-black">{friend.username}</span> de ta liste d'amis ?
        </>
      }
      onConfirm={handleDelete}
      confirmBtnText="Retirer l'ami"
      isLoading={loading}
    />
  );
};

export default DeleteFriendDialog;
