import { forwardRef, KeyboardEvent } from "react";

interface Props {
  selectedMembersIds: number[];
  pressDelete: (e: KeyboardEvent<HTMLInputElement>) => void;
  search: string;
  setSearch: (q: string) => void;
  setHoveredIndex: (idx: number) => void;
}

const GroupSearchBar = forwardRef<HTMLInputElement, Props>(
  ({ selectedMembersIds, pressDelete, setSearch, search, setHoveredIndex }, searchInputRef) => {
    return (
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
    );
  }
);

export default GroupSearchBar;
