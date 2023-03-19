import { ChangeEvent, useRef, useState } from "react";
import useFriendsTab from "../../hooks/friendsNavTab/useFriendsTab";
import ClearIcon from "../Icons/ClearIcon";
import SearchIcon from "../Icons/SearchIcon";

interface Props {
  search: string;
  handleChange: (search: string) => void;
}

const FriendsSearchbar = ({ search, handleChange }: Props) => {
  const isDirty = useRef(false);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
    isDirty.current = true;
  };

  const [selectedTab] = useFriendsTab();
  const [previousTab, setPreviousTab] = useState(selectedTab);
  if (previousTab !== selectedTab) {
    setPreviousTab(selectedTab);
    handleChange("");
  }

  return (
    <div className="flex flex-none mt-4 mr-5 mb-2 ml-[30px] overflow-hidden rounded bg-tertiary">
      <div className="flex flex-row flex-wrap p-px flex-auto min-w-0 items-center">
        <input
          type="text"
          placeholder="Rechercher"
          aria-label="Rechercher"
          className="py-0 px-2 h-[30px] bg-transparent flex-1 m-px min-w-[48px] focus:outline-none text-secondary-light text-btw-base-sm"
          value={search}
          onChange={onChange}
        />
        <div
          onClick={search !== "" ? () => handleChange("") : undefined}
          className={`h-8 w-8 flex items-center justify-center ${search === "" ? "cursor-text" : "cursor-pointer"}`}
        >
          <div className="h-5 w-5">
            {search === "" ? (
              <SearchIcon className={`text-h-secondary h-full w-full ${isDirty.current && "animate-spin-45"}`} />
            ) : (
              <ClearIcon className="text-h-secondary h-full w-full animate-spin-45" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsSearchbar;
