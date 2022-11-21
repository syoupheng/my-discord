import useDeleteFriend from "../../hooks/friends/useDeleteFriend";
import { Friend } from "../../types/user";
import ModalDialog from "../shared/ModalDialog";

interface Props {
  friend: Friend;
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

const DeleteFriendDialog = ({ friend, isOpen, setIsOpen }: Props) => {
  const [deleteFriend] = useDeleteFriend(friend.id);

  const handleDelete = () => {
    setIsOpen(false);
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
    />
  );
};

export default DeleteFriendDialog;
