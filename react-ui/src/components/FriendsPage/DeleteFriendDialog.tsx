import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import useDeleteFriend from "../../hooks/friends/useDeleteFriend";
import { Friend } from "../../types/user";
import ModalButton from "../shared/buttons/ModalButton";

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

        <div className="fixed inset-0 flex items-center justify-center p-4">
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
                <Dialog.Title className="text-white text-xl font-bold mb-3">Retirer '{friend.username}'</Dialog.Title>
                <p className="mb-8 text-btw-base-sm text-secondary-light">
                  Tu es sûr(e) de vouloir retirer définitivement <span className="font-black">{friend.username}</span> de ta liste d'amis ?
                </p>
              </div>
              <div className="p-4 flex justify-end bg-secondary">
                <ModalButton variant="transparent" onClick={() => setIsOpen(false)}>
                  Annuler
                </ModalButton>
                <ModalButton variant="red" onClick={handleDelete}>
                  Retirer l'ami
                </ModalButton>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteFriendDialog;
