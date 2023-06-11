import CloseIcon from "@/components/Icons/CloseIcon";
import { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

type Props = PropsWithChildren & {
  url?: string;
  onClose?: () => any;
  isActive: boolean;
};

const ChannelSidebarItem = ({ url = "", children, onClose, isActive }: Props) => {
  return (
    <li className="flex items-center w-full rounded group hover:bg-mod-hov my-[2px] max-w-[224px]">
      <NavLink
        to={`/channels/@me${url}`}
        className={`rounded flex-auto min-w-0 whitespace-nowrap overflow-hidden flex items-center h-[42px] ${
          isActive ? "text-white bg-grey-selected" : "text-channels-default"
        } group-hover:text-secondary-light group-hover:bg-transparent`}
      >
        {children}
      </NavLink>
      {onClose && (
        <div onClick={onClose} className="hidden group-hover:block hover:text-gray-50 text-h-secondary opacity-70 m-[2px] pr-2 cursor-pointer">
          <CloseIcon size={16} />
        </div>
      )}
    </li>
  );
};

export default ChannelSidebarItem;
