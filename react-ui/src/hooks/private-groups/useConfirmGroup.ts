import usePrivateConversations from "@/hooks/private-conversation/usePrivateConversations";
import useShowConversation from "@/hooks/private-conversation/useShowConversation";
import useAddToGroup from "@/hooks/private-groups/useAddToGroup";
import useCreateGroup from "@/hooks/private-groups/useCreateGroup";
import { useNavigate } from "react-router-dom";

type Params = {
  groupId: number | null;
  maxMembers: number;
  selectedMembersIds: number[];
  currentMembersIds: (number | undefined)[];
  closePopover: () => void;
}

const useConfirmGroup = ({ groupId, maxMembers, selectedMembersIds, currentMembersIds, closePopover }: Params) => {
  const [createGroup, { loading: creatingGroup }] = useCreateGroup();
  const [addToGroup, { loading: addingMembers }] = useAddToGroup();
  const [showConversation, { loading: loadingConversation }] = useShowConversation({ friendId: selectedMembersIds[0], redirect: true });
  const loading = creatingGroup || addingMembers || loadingConversation;
  const leftMembersAllowed = maxMembers - (selectedMembersIds.length + (groupId ? 0 : 1));
  const canValidate = leftMembersAllowed >= 0 && !loading && selectedMembersIds.length > 0;

  const privateConversations = usePrivateConversations();
  const navigate = useNavigate();
  let action: () => any;
  if (groupId) {
    action = () => addToGroup({ variables: { membersIds: selectedMembersIds, groupId } });
  } else if (selectedMembersIds.length === 1 && currentMembersIds.length === 0) {
    const conversation = privateConversations.find((conv) => conv.member.id === selectedMembersIds[0]);
    action = () => (conversation ? navigate(`/channels/@me/${conversation.id}`) : showConversation());
  } else {
    action = () => createGroup({ variables: { membersIds: [...selectedMembersIds, ...currentMembersIds] } });
  }

  const confirmGroup = async () => {
    if (!canValidate) return;
    await action();
    closePopover();
  };
  return { confirmGroup, loading, canValidate, leftMembersAllowed };
};

export default useConfirmGroup;
