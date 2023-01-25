import { useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import DeleteMessageDialog from "../DeleteMessageDialog";
import MessageButton from "./MessageButton";

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
