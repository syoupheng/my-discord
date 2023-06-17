import GroupMembersList from "@/components/privateGroups/GroupMembersList";
import GroupSearchBar from "@/components/privateGroups/GroupSearchBar";
import MemberTagList from "@/components/privateGroups/MemberTagList";
import Spinner from "@/components/shared/Spinner";
import Button from "@/components/shared/buttons/Button";
import useFriends from "@/hooks/friends/useFriends";
import useConfirmGroup from "@/hooks/private-groups/useConfirmGroup";
import useNewGroupState from "@/hooks/private-groups/useNewGroupState";
import useScrollPosition from "@/hooks/ui/useScrollPosition";
import { useRef, useState } from "react";

type Props = {
  closePopover: () => void;
  currentMembersIds?: (number | undefined)[];
  groupId?: number | null;
};

const AddNewGroupPopup = ({ closePopover, currentMembersIds = [], groupId = null }: Props) => {
  const friends = useFriends();
  const friendListRef = useRef<HTMLDivElement>(null);
  const scrollTop = useScrollPosition(friendListRef);
  const MAX_MEMBERS = 10 - currentMembersIds.length;
  const friendsToAdd = friends.filter(({ id }) => !currentMembersIds.includes(id));

  const [search, setSearch] = useState("");
  const searchedFriends = friendsToAdd.filter((friend) =>
    [friend.username.toLowerCase(), friend.discriminator].join("#").includes(search.toLowerCase())
  );

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
        filterFriends={searchedFriends}
        hoveredIndex={hoveredIndex}
        handleClick={handleClickFriend}
        handleHover={setHoveredIndex}
        isSelected={isSelected}
      />
      <div className="h-[1px] mx-[10px] shadow-[0_-1px_0px_rgba(255,255,255,0.04)]"></div>
      <div className="flex-auto p-5 flex flex-col flex-nowrap justify-start items-stretch">
        <Button onClick={confirmGroup} disabled={!canValidate}>
          <div className="text-btw-sm-xs">{loading ? <Spinner white /> : groupId ? "Ajouter" : "Créer un groupe privé"}</div>
        </Button>
      </div>
    </div>
  );
};

export default AddNewGroupPopup;
