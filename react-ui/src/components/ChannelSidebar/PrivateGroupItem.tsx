import ChannelSidebarItem from "@/components/ChannelSidebar/ChannelSidebarItem";
import LeaveGroupDialog from "@/components/ChannelSidebar/LeaveGroupDialog";
import MessageItemLabel from "@/components/ChannelSidebar/MessageItemLabel";
import ChannelIcon from "@/components/Icons/ChannelIcon";
import { PrivateGroupFragment } from "@/gql/graphql";
import { useState } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  group: PrivateGroupFragment;
};

const PrivateGroupItem = ({ group }: Props) => {
  const { members, id, name, avatarColor } = group;
  const location = useLocation();
  const isActive = location.pathname === `/channels/@me/${id}`;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ChannelSidebarItem url={`/${id}`} onClose={() => setIsOpen(true)} isActive={isActive}>
      <div className="flex items-center px-2">
        <div className=" shrink-0 mr-3">
          <ChannelIcon avatarColor={avatarColor} size="sm" channelType="group" />
        </div>
        <MessageItemLabel label={name ?? ""} nbMembers={members.length} />
        <LeaveGroupDialog modalOpen={isOpen} onModalOpen={setIsOpen} group={group} />
      </div>
    </ChannelSidebarItem>
  );
};

export default PrivateGroupItem;
