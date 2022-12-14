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
  const isActive = location.pathname === `/channels/@me/groups/${id}`;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ChannelSidebarItem url={`/groups/${id}`} onClose={() => setIsOpen(true)} isActive={isActive}>
      <div className="flex items-center px-2">
        <GroupIcon className="mr-3 w-8 h-8 shrink-0" />
        <MessageItemLabel label={name} nbMembers={members.length} />
        <LeaveGroupDialog modalOpen={isOpen} onModalOpen={setIsOpen} group={group} />
      </div>
    </ChannelSidebarItem>
  );
};

export default PrivateGroupItem;
