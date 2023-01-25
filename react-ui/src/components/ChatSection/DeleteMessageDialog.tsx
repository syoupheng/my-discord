import useDeleteMessage from "../../hooks/chat-messages/useDeleteMessage";
import useMessageContext from "../../hooks/chat-messages/useMessageContext";
import ModalDialog from "../shared/ModalDialog";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const DeleteMessageDialog = ({ isOpen, setIsOpen }: Props) => {
  const message = useMessageContext();
  const [deleteMessage] = useDeleteMessage(message.id, setIsOpen);

  return (
    <ModalDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Supprimer le message"
      content={"Tu es sûr(e) de vouloir supprimer ce message ?"}
      confirmBtnText="Supprimer"
      onConfirm={deleteMessage}
    />
  );
};

export default DeleteMessageDialog;
