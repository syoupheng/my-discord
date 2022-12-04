import { useRef, useState } from "react";
import useFriends from "../../hooks/friends/useFriends";
import useConfirmGroup from "../../hooks/private-groups/useConfirmGroup";
import useNewGroupState from "../../hooks/private-groups/useNewGroupState";
import useScrollPosition from "../../hooks/ui/useScrollPosition";
import Button from "../shared/buttons/Button";
import Spinner from "../shared/Spinner";
import GroupMembersList from "./GroupMembersList";
import GroupSearchBar from "./GroupSearchBar";
import MemberTagList from "./MemberTagList";

interface Props {
  closePopover: () => void;
  currentMembersIds?: (number | undefined)[];
  groupId?: number | null;
}

const AddNewGroupPopup = ({ closePopover, currentMembersIds = [], groupId = null }: Props) => {
  const { data } = useFriends();
  const friendListRef = useRef<HTMLDivElement>(null);
  const scrollTop = useScrollPosition(friendListRef);
  const MAX_MEMBERS = 10 - currentMembersIds.length;

  if (!data) return null;
  const friends = data.me.friends.filter(({ id }) => !currentMembersIds.includes(id));

  const [search, setSearch] = useState("");
  const filterFriends = friends.filter((friend) => [friend.username, friend.id].join("#").includes(search));

  const searchInputRef = useRef<HTMLInputElement>(null);

  const { selectedMembersIds, handleClickFriend, handleClickMemberTag, pressDelete, isSelected } = useNewGroupState(searchInputRef, search);

  const { confirmGroup, loading, canValidate, leftMembersAllowed } = useConfirmGroup({
    groupId,
    maxMembers: MAX_MEMBERS,
    selectedMembersIds,
    currentMembersIds,
    closePopover,
  });

  const [hoveredIndex, setHoveredIndex] = useState(0);

  return (
    <div className="flex flex-col">
      <div
        className={`grow-0 shrink-0 basis-auto p-4 relative overflow-x-hidden flex flex-nowrap flex-col justify-start items-stretch ${
          scrollTop > 0 && "shadow-md"
        }`}
      >
        <h1 className="text-white font-medium text-xl">Sélectionne des amis</h1>
        <div className={`${leftMembersAllowed >= 0 ? "text-h-secondary" : "text-red"} mt-1 text-xs`}>
          {leftMembersAllowed > 0
            ? `Tu peux encore ajouter ${leftMembersAllowed} ${leftMembersAllowed > 1 ? "autres amis." : "autre ami."}`
            : `Ce groupe est limité à ${MAX_MEMBERS + currentMembersIds.length} membres.`}
        </div>
        <div className="flex-auto mt-5 flex flex-nowrap justify-start items-stretch">
          <div className="flex-1 flex rounded bg-tertiary">
            <div className="overflow-x-hidden overflow-y-scroll relative flex-auto flex flex-wrap p-[1px]">
              <MemberTagList selectedMembersIds={selectedMembersIds} friends={friends} handleClickMemberTag={handleClickMemberTag} />
              <GroupSearchBar
                ref={searchInputRef}
                search={search}
                setSearch={setSearch}
                setHoveredIndex={setHoveredIndex}
                pressDelete={pressDelete}
                selectedMembersIds={selectedMembersIds}
              />
            </div>
          </div>
        </div>
      </div>
      <GroupMembersList
        ref={friendListRef}
        filterFriends={filterFriends}
        hoveredIndex={hoveredIndex}
        handleClick={handleClickFriend}
        handleHover={setHoveredIndex}
        isSelected={isSelected}
      />
      <div className="h-[1px] mx-[10px] shadow-[0_-1px_0px_rgba(255,255,255,0.04)]"></div>
      <div className="flex-auto p-5 flex flex-col flex-nowrap justify-start items-stretch">
        <Button onClick={confirmGroup} className="h-[38px]" disabled={!canValidate}>
          <div className="text-btw-sm-xs">{loading ? <Spinner white /> : groupId ? "Ajouter" : "Créer un groupe privé"}</div>
        </Button>
      </div>
    </div>
  );
};

export default AddNewGroupPopup;
