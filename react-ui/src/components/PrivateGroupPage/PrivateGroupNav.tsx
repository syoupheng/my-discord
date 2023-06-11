import { MdPeopleAlt } from "react-icons/md";
import { PrivateGroupFragment } from "@/gql/graphql";
import AddGroupMemberBtn from "@/components/ChatSection/AddGroupMemberBtn";
import ChatNav from "@/components/ChatSection/ChatNav";
import DisplayMembersBtn from "@/components/PrivateGroupPage/DisplayMembersBtn";
import GroupName from "@/components/PrivateGroupPage/GroupName";

type Props = {
  group: PrivateGroupFragment;
};

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
