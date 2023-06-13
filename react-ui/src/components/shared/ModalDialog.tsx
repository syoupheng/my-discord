import Spinner from "@/components/shared/Spinner";
import ModalButton from "@/components/shared/buttons/ModalButton";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  title: string;
  content: ReactNode;
  onConfirm: any;
  confirmBtnText: string;
  isLoading?: boolean
}

const ModalDialog = ({ isOpen, setIsOpen, title, content, onConfirm, confirmBtnText, isLoading = false }: Props) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>

        <div onClick={(e) => e.stopPropagation()} className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100 "
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-50"
          >
            <Dialog.Panel className="mx-auto max-w-md rounded bg-primary">
              <div className="px-4 pt-4">
                <Dialog.Title className="text-white text-xl font-bold mb-3">{title}</Dialog.Title>
                <p className="mb-8 text-btw-base-sm text-secondary-light">{content}</p>
              </div>
              <div className="p-4 flex justify-end bg-secondary">
                <ModalButton variant="transparent" onClick={() => setIsOpen(false)}>
                  Annuler
                </ModalButton>
                <ModalButton disabled={isLoading} variant="red" onClick={onConfirm}>
                  {isLoading ? <Spinner white size="sm" /> : confirmBtnText}
                </ModalButton>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalDialog;
