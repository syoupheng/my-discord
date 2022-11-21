import { useRef, useState } from "react";
import useFriends from "../../hooks/friends/useFriends";
import useCreateGroup from "../../hooks/private-groups/useCreateGroup";
import useNewGroupState from "../../hooks/private-groups/useNewGroupState";
import useScrollPosition from "../../hooks/ui/useScrollPosition";
import NoResultsIcon from "../Icons/NoResultsIcon";
import Button from "../shared/buttons/Button";
import Spinner from "../shared/Spinner";
import GroupMembersList from "./GroupMembersList";
import GroupMemberTag from "./GroupMemberTag";

interface Props {
  closePopover: () => void;
}

const AddNewGroupPopup = ({ closePopover }: Props) => {
  const { data } = useFriends();
  const friendListRef = useRef<HTMLDivElement>(null);
  const scrollTop = useScrollPosition(friendListRef);
  const MAX_MEMBERS = 10;

  if (!data) return null;
  const { friends } = data.me;

  const [search, setSearch] = useState("");
  const filterFriends = friends.filter((friend) => [friend.username, friend.id].join("#").includes(search));

  const searchInputRef = useRef<HTMLInputElement>(null);

  const { selectedMembersIds, handleClickFriend, handleClickMemberTag, pressDelete, isSelected } = useNewGroupState(searchInputRef, search);

  const [createGroup, { loading }] = useCreateGroup();
  const leftMembersAllowed = MAX_MEMBERS - (selectedMembersIds.length + 1);
  const canCreateGroup = leftMembersAllowed >= 0 && !loading;
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const confirmGroup = async () => {
    if (!canCreateGroup) return;
    if (selectedMembersIds.length === 1) return; // redirect to conversation or show conversation and redirect
    await createGroup({ variables: { membersIds: selectedMembersIds } });
    closePopover();
  };

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
            : `Ce groupe est limité à ${MAX_MEMBERS} membres.`}
        </div>
        <div className="flex-auto mt-5 flex flex-nowrap justify-start items-stretch">
          <div className="flex-1 flex rounded bg-tertiary">
            <div className="overflow-x-hidden overflow-y-scroll relative flex-auto flex flex-wrap p-[1px]">
              {selectedMembersIds.map((id) => {
                const friend = friends.find((friend) => friend.id === id);
                if (friend) return <GroupMemberTag friend={friend} handleClick={handleClickMemberTag} />;
              })}
              <input
                ref={searchInputRef}
                onKeyDown={pressDelete}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setHoveredIndex(0);
                }}
                value={search}
                autoFocus
                className="leading-8 h-[30px] px-2 bg-transparent border-0 resize-none flex-1 min-w-[48px] m-[1px] text-secondary-light text-sm focus:outline-none"
                type="text"
                spellCheck="false"
                placeholder={selectedMembersIds.length > 0 ? "Rechercher/lancer une conversation" : "Entre le nom d'utilisateur d'un ami"}
              />
            </div>
          </div>
        </div>
      </div>
      {filterFriends.length === 0 ? (
        <div className="flex-auto text-primary-dark-400 px-12 text-center mb-5 max-h-48 text-btw-base-sm flex flex-col flex-nowrap justify-center">
          <div className="mb-5 mx-auto">
            <NoResultsIcon />
          </div>
          <div>Aucun ami trouvé n'étant pas déjà dans ce groupe privé.</div>
        </div>
      ) : (
        <GroupMembersList
          filterFriends={filterFriends}
          hoveredIndex={hoveredIndex}
          handleClick={handleClickFriend}
          handleHover={setHoveredIndex}
          isSelected={isSelected}
        />
      )}
      <div className="h-[1px] mx-[10px] shadow-[0_-1px_0px_rgba(255,255,255,0.04)]"></div>
      <div className="flex-auto p-5 flex flex-col flex-nowrap justify-start items-stretch">
        <Button onClick={confirmGroup} className="h-[38px]" disabled={!canCreateGroup}>
          <div className="text-btw-sm-xs">{loading ? <Spinner white /> : "Créer un groupe privé"}</div>
        </Button>
      </div>
    </div>
  );
};

export default AddNewGroupPopup;
