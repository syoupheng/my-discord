import GroupMemberItem from "@/components/PrivateGroupPage/GroupMemberItem";
import { ChannelMemberFragment } from "@/gql/graphql";
import useIsMembersOpen from "@/hooks/private-groups/useIsMembersOpen";

type Props = {
  members: ChannelMemberFragment[];
}

const MembersSidebar = ({ members }: Props) => {
  const [isMembersOpen] = useIsMembersOpen();
  if (!isMembersOpen) return null;
  return (
    <div className="relative min-w-[240px] max-h-full flex">
      <div className="overflow-x-hidden overflow-y-scroll pr-0 bg-secondary w-60 pb-5 grow-0 shrink-0 basis-auto h-auto relative min-h-0">
        <h2 className="pt-6 pr-2 pl-4 h-10 text-ellipsis whitespace-nowrap overflow-hidden uppercase text-xs font-medium text-channels-default">
          Membres-{members.length}
        </h2>
        {members.map((member) => (
          <GroupMemberItem key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default MembersSidebar;
