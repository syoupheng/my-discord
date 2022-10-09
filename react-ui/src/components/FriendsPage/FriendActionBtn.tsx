import { ReactNode } from "react";
import Tooltip from "../shared/Tooltip";

interface Props {
  icon: ReactNode;
  description?: string;
  isFirst?: boolean;
}

const FriendActionBtn = ({
  icon,
  description = "",
  isFirst = false,
}: Props) => {
  return (
    <div className="cursor-pointer h-9 w-9 rounded-full text-h-secondary bg-secondary flex items-center justify-center relative mp-btn group-hover:bg-tertiary hover:text-secondary-light ml-2 first:ml-0">
      {icon}
      <Tooltip
        tooltipTxt={description}
        className={`${isFirst ? "-bottom-12 z-30" : "origin-top -top-12"} text-xs`}
        groupHover={false}
      />
    </div>
  );
};

export default FriendActionBtn;
