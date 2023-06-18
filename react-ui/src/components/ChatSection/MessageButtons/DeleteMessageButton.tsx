import DeleteMessageDialog from "@/components/ChatSection/DeleteMessageDialog";
import MessageButton from "@/components/ChatSection/MessageButtons/MessageButton";
import { useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";

const DeleteMessageButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <MessageButton label="Supprimer" action={() => setModalOpen(true)}>
        <RiDeleteBin5Fill size={18} />
      </MessageButton>
      <DeleteMessageDialog isOpen={modalOpen} setIsOpen={setModalOpen} />
    </>
  );
};

export default DeleteMessageButton;
