import { useNavigate } from "react-router-dom";
import usePrivateConversations from "../private-conversation/usePrivateConversations";
import useShowConversation from "../private-conversation/useShowConversation";
import useAddToGroup from "./useAddToGroup";
import useCreateGroup from "./useCreateGroup";

interface TParams {
  groupId: number | null;
  maxMembers: number;
  selectedMembersIds: number[];
  currentMembersIds: (number | undefined)[];
  closePopover: () => void;
}

const useConfirmGroup = ({ groupId, maxMembers, selectedMembersIds, currentMembersIds, closePopover }: TParams) => {
  const [createGroup, { loading: creatingGroup }] = useCreateGroup();
  const [addToGroup, { loading: addingMembers }] = useAddToGroup();
  const [showConversation, { loading: loadingConversation }] = useShowConversation({ friendId: selectedMembersIds[0], redirect: true });
  const loading = creatingGroup || addingMembers || loadingConversation;
  const leftMembersAllowed = maxMembers - (selectedMembersIds.length + 1);
  const canValidate = leftMembersAllowed >= 0 && !loading;

  const { data: privateConversationData } = usePrivateConversations();
  const { privateConversations } = privateConversationData?.me!;
  const navigate = useNavigate();
  let action: () => any;
  if (groupId) {
    action = () => addToGroup({ variables: { membersIds: selectedMembersIds, groupId } });
  } else if (
    (selectedMembersIds.length === 1 && currentMembersIds.length === 0) ||
    (selectedMembersIds.length === 0 && currentMembersIds.length === 1)
  ) {
    const conversation = privateConversations.find((conv) => conv.member.id === selectedMembersIds[0]);
    action = () => (conversation ? navigate(`/channels/@me/conversations/${conversation.id}`) : showConversation());
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
