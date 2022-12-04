import { MdPeopleAlt } from "react-icons/md";
import { PrivateGroup } from "../../types/private-group";
import AddGroupMemberBtn from "../ChatSection/AddGroupMemberBtn";
import ChatNav from "../ChatSection/ChatNav";
import DisplayMembersBtn from "./DisplayMembersBtn";
import GroupName from "./GroupName";

interface Props {
  group: PrivateGroup;
}

const PrivateGroupNav = ({ group }: Props) => {
  return (
    <ChatNav>
      <ChatNav.LeftSection>
        <div className="basis-auto grow-0 shrink-0 w-auto mx-2 text-channels-default">
          <MdPeopleAlt size={24} />
        </div>
        <GroupName group={group} />
      </ChatNav.LeftSection>
      <ChatNav.RightSection>
        <AddGroupMemberBtn currentMembersIds={group.members.map(({ id }) => id)} groupId={group.id} />
        <DisplayMembersBtn />
      </ChatNav.RightSection>
    </ChatNav>
  );
};

export default PrivateGroupNav;
