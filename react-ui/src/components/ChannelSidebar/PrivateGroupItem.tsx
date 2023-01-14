import { useState } from "react";
import { useLocation } from "react-router-dom";
import { PrivateGroup } from "../../types/private-group";
import GroupIcon from "../Icons/GroupIcon";
import ChannelSidebarItem from "./ChannelSidebarItem";
import LeaveGroupDialog from "./LeaveGroupDialog";
import MessageItemLabel from "./MessageItemLabel";

interface Props {
  group: PrivateGroup;
}

const PrivateGroupItem = ({ group }: Props) => {
  const { members, id, name } = group;
  const location = useLocation();
  const isActive = location.pathname === `/channels/@me/${id}`;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ChannelSidebarItem url={`/${id}`} onClose={() => setIsOpen(true)} isActive={isActive}>
      <div className="flex items-center px-2">
        <div className=" shrink-0 mr-3">
          <GroupIcon size="sm" />
        </div>
        <MessageItemLabel label={name} nbMembers={members.length} />
        <LeaveGroupDialog modalOpen={isOpen} onModalOpen={setIsOpen} group={group} />
      </div>
    </ChannelSidebarItem>
  );
};

export default PrivateGroupItem;
