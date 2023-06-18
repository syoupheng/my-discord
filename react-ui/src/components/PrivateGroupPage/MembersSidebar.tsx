import GroupMemberItem from "@/components/PrivateGroupPage/GroupMemberItem";
import { ChannelMemberFragment } from "@/gql/graphql";
import useIsMembersOpen from "@/hooks/private-groups/useIsMembersOpen";
// import { Transition } from "@headlessui/react";

type Props = {
  members: ChannelMemberFragment[];
};

const MembersSidebar = ({ members }: Props) => {
  const [isMembersOpen] = useIsMembersOpen();
  if (!isMembersOpen) return null;
  return (
    // <Transition
    //   className="relative min-w-[240px] max-h-full flex"
    //   show={isMembersOpen}
    //   enter="transition ease-in-out duration-1000 transform"
    //   enterFrom="translate-x-full"
    //   enterTo="translate-x-0"
    //   leave="transition ease-in-out duration-1000 transform"
    //   leaveFrom="translate-x-0"
    //   leaveTo="translate-x-full"
    // >
    <div className="relative min-w-[240px] max-h-full flex">
      <div className="overflow-x-hidden overflow-y-scroll pr-0 bg-secondary w-60 pb-5 grow-0 shrink-0 basis-auto h-auto min-h-0 small-scroll-container absolute inset-0">
        <h2 className="pt-6 pr-2 pl-4 h-10 text-ellipsis whitespace-nowrap overflow-hidden uppercase text-xs font-medium text-channels-default">
          Membres-{members.length}
        </h2>
        {members.map((member) => (
          <GroupMemberItem key={member.id} member={member} />
        ))}
      </div>
    </div>
    // </Transition>
  );
};

export default MembersSidebar;
