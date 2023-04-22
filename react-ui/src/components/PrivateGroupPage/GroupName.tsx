import { PrivateGroup } from "../../gql/graphql";
import useGroupNameInput from "../../hooks/private-groups/useGroupNameInput";

interface Props {
  group: PrivateGroup;
}

const GroupName = ({ group }: Props) => {
  const { nameInput, setNameInput, isFocused, setIsFocused, isHovered, setIsHovered, onConfirm } = useGroupNameInput(group);
  return (
    <div className="min-w-0 flex-auto flex">
      <div className="flex-initial pr-1 max-w-full min-w-0">
        <div className="font-medium flex relative">
          <input
            type="text"
            autoComplete="off"
            className={`${
              isFocused ? "bg-secondary opacity-100 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.5)]" : "bg-transparent opacity-0"
            } absolute left-0 w-full leading-8 h-8 px-[6px] border-0 text-ellipsis overflow-hidden whitespace-pre rounded-[3px] text-secondary-light focus:outline-none`}
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onClick={() => setIsFocused(true)}
            onBlur={onConfirm}
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onKeyDown={(e) => e.key === "Enter" && onConfirm()}
          />
          <div
            className={`${isFocused ? "invisible" : ""} ${
              isHovered ? "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.5)]" : ""
            } leading-8 h-8 px-[6px] border-0 text-ellipsis overflow-hidden whitespace-pre rounded-[3px] bg-transparent text-secondary-light`}
          >
            {group.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupName;
