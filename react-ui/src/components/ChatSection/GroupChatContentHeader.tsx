import useFindGroup from "../../hooks/private-groups/useFindGroup";
import GroupIcon from "../Icons/GroupIcon";

const GroupChatContentHeader = () => {
  const group = useFindGroup();
  return (
    <div className="flex flex-col justify-end m-4">
      <GroupIcon size="lg" />
      <h3 className="font-bold my-2 text-white text-[28px] leading-10">{group?.name}</h3>
      <div className="text-h-secondary text-btw-base-sm leading-5 font-normal">
        Bienvenue au début du groupe privé <strong>{group?.name}</strong>
      </div>
    </div>
  );
};

export default GroupChatContentHeader;
