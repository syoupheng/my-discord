import ModalDialog from "@/components/shared/ModalDialog";
import useDeleteMessage from "@/hooks/chat-messages/useDeleteMessage";
import useMessageContext from "@/hooks/chat-messages/useMessageContext";

type Props = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const DeleteMessageDialog = ({ isOpen, setIsOpen }: Props) => {
  const message = useMessageContext();
  const [deleteMessage, { loading }] = useDeleteMessage(message.id, setIsOpen);

  return (
    <ModalDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Supprimer le message"
      content={"Tu es sûr(e) de vouloir supprimer ce message ?"}
      confirmBtnText="Supprimer"
      onConfirm={deleteMessage}
      isLoading={loading}
    />
  );
};

export default DeleteMessageDialog;
