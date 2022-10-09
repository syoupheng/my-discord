import ClearIcon from "../Icons/ClearIcon";
import SearchIcon from "../Icons/SearchIcon";

interface Props {
  search: string;
  handleChange: (search: string) => void;
}

const FriendsSearchbar = ({ search, handleChange }: Props) => {
  return (
    <div className="flex flex-none mt-4 mr-5 mb-2 ml-[30px] overflow-hidden rounded bg-tertiary">
      <div className="flex flex-row flex-wrap p-px flex-auto min-w-0 items-center">
        <input
          type="text"
          placeholder="Rechercher"
          aria-label="Rechercher"
          className="py-0 px-2 h-[30px] bg-transparent flex-1 m-px min-w-[48px] focus:outline-none text-secondary-light text-btw-base-sm"
          value={search}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div
          onClick={search !== "" ? () => handleChange("") : undefined}
          className={`h-8 w-8 flex items-center justify-center ${
            search === "" ? "cursor-text" : "cursor-pointer"
          }`}
        >
          <div className="h-5 w-5">
            {search === "" ? (
              <SearchIcon className="text-h-secondary h-full w-full" />
            ) : (
              <ClearIcon className="text-h-secondary h-full w-full" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsSearchbar;
