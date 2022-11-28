import useLeaveGroup from "../../hooks/private-groups/useLeaveGroup";
import { PrivateGroup } from "../../types/private-group";
import ModalDialog from "../shared/ModalDialog";

interface Props {
  group: PrivateGroup;
  modalOpen: boolean;
  onModalOpen: (val: boolean) => void;
}

const LeaveGroupDialog = ({ group, modalOpen, onModalOpen }: Props) => {
  const [leaveGroup] = useLeaveGroup();

  return (
    <ModalDialog
      title={`Quitter '${group.name}'`}
      isOpen={modalOpen}
      setIsOpen={onModalOpen}
      content={
        <>
          Tu es sûr(e) de vouloir quitter <span className="font-black">{group.name}</span> ? Tu ne pourras plus revenir dans ce groupe à moins d'y
          être invité(e) à nouveau.
        </>
      }
      confirmBtnText="Quitter le groupe"
      onConfirm={() => leaveGroup({ variables: { groupId: group.id } })}
    />
  );
};

export default LeaveGroupDialog;
