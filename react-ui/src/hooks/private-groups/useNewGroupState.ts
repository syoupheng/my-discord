import { RefObject, useState, KeyboardEvent } from "react";

const useNewGroupState = (searchInputRef: RefObject<HTMLInputElement>, search: string) => {
  const [selectedMembersIds, setSelectedMembersIds] = useState<number[]>([]);
  const isSelected = (friendId: number) => selectedMembersIds.includes(friendId);
  const addMember = (id: number) => setSelectedMembersIds((prev) => (!prev.includes(id) ? [...prev, id] : prev));
  const removeMember = (id: number) => setSelectedMembersIds((prev) => prev.filter((memberId) => memberId !== id));

  const handleClickFriend = (id: number) => {
    isSelected(id) ? removeMember(id) : addMember(id);
    searchInputRef.current?.focus();
  };

  const handleClickMemberTag = (id: number) => {
    removeMember(id);
    searchInputRef.current?.focus();
  };

  const pressDelete = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && selectedMembersIds.length > 0 && search === "") removeMember(selectedMembersIds.at(-1) ?? -1);
  };
  return { selectedMembersIds, isSelected, handleClickFriend, handleClickMemberTag, pressDelete };
};

export default useNewGroupState;
