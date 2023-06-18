import MyModal from "@/components/shared/MyModal";
import Spinner from "@/components/shared/Spinner";
import ModalButton from "@/components/shared/buttons/ModalButton";
import { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  title: string;
  content: ReactNode;
  onConfirm: any;
  confirmBtnText: string;
  isLoading?: boolean;
};

const ModalDialog = ({ isOpen, setIsOpen, title, content, onConfirm, confirmBtnText, isLoading = false }: Props) => {
  return (
    <MyModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <MyModal.Panel style={{ width: "440px" }}>
        <MyModal.Content title={title}>{content}</MyModal.Content>
        <MyModal.Controls>
          <ModalButton variant="transparent" onClick={() => setIsOpen(false)}>
            Annuler
          </ModalButton>
          <ModalButton disabled={isLoading} variant="red" onClick={onConfirm}>
            {isLoading ? <Spinner white size="sm" /> : confirmBtnText}
          </ModalButton>
        </MyModal.Controls>
      </MyModal.Panel>
    </MyModal>
  );
};

export default ModalDialog;
