import ModalDialog from "@/components/shared/ModalDialog";
import { PrivateGroupFragment } from "@/gql/graphql";
import useLeaveGroup from "@/hooks/private-groups/useLeaveGroup";

type Props = {
  group: PrivateGroupFragment;
  modalOpen: boolean;
  onModalOpen: (val: boolean) => void;
}

const LeaveGroupDialog = ({ group, modalOpen, onModalOpen }: Props) => {
  const [leaveGroup, { loading }] = useLeaveGroup();

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
      isLoading={loading}
    />
  );
};

export default LeaveGroupDialog;
