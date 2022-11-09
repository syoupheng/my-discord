import { ReactNode } from "react";
import { NavLink, useParams } from "react-router-dom";
import CloseIcon from "../Icons/CloseIcon";

interface Props {
  children: ReactNode;
  roomId?: number;
  closeBtn?: boolean;
}

const ChannelSidebarItem = ({ children, roomId, closeBtn = false }: Props) => {
  const params = useParams();
  const isActive = params?.roomId === roomId?.toString();
  return (
    <li className="flex items-center w-full rounded group hover:bg-mod-hov my-[2px] max-w-[224px]">
      <NavLink
        to={`/channels/@me${roomId ? "/" + roomId : ""}`}
        className={`rounded flex-auto min-w-0 whitespace-nowrap overflow-hidden flex items-center h-[42px] ${
          isActive ? "text-white bg-grey-selected" : "text-channels-default"
        } group-hover:text-secondary-light group-hover:bg-transparent`}
      >
        {children}
      </NavLink>
      {closeBtn && (
        <div className="hidden group-hover:block hover:text-gray-50 text-h-secondary opacity-70 m-[2px] pr-2 cursor-pointer">
          <CloseIcon size={16} />
        </div>
      )}
    </li>
  );
};

export default ChannelSidebarItem;
