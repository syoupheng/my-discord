import AddGroupMemberBtn from "@/components/ChatSection/AddGroupMemberBtn";
import ChatNav from "@/components/ChatSection/ChatNav";
import ArobasIcon from "@/components/Icons/ArobasIcon";
import TooltipWrapper from "@/components/shared/TooltipWrapper";
import UserStatusIcon from "@/components/shared/UserStatusIcon";
import { PrivateConversationFragment, UserStatus } from "@/gql/graphql";
import useFriends from "@/hooks/friends/useFriends";

type Props = {
  conversation: PrivateConversationFragment;
};

const PrivateConversationNav = ({ conversation }: Props) => {
  const friends = useFriends();
  const friendData = friends.find((friend) => friend.id === conversation?.member.id);
  const userStatus: UserStatus = friendData?.status ?? "INVISIBLE";
  return (
    <ChatNav>
      <ChatNav.LeftSection>
        <div className="mx-2 h-6 w-auto basis-auto grow-0 shrink-0 text-channels-default">
          <ArobasIcon />
        </div>
        <TooltipWrapper
          direction="down"
          tooltipTxt={`${conversation.member.username}#${conversation.member.discriminator}`}
          className="mr-2 shrink-0 grow-0 basis-auto"
        >
          <h1 className="cursor-pointer whitespace-nowrap overflow-hidden flex justify-start items-center text-white font-medium text-[17px] leading-[22px]">
            {conversation?.member.username}
          </h1>
        </TooltipWrapper>
        <div className="basis-auto shrink-0 grow-0 mr-2 flex items-center">
          <UserStatusIcon status={userStatus} size={10} />
        </div>
      </ChatNav.LeftSection>
      <ChatNav.RightSection>{!!friendData && <AddGroupMemberBtn currentMembersIds={[conversation?.member.id]} />}</ChatNav.RightSection>
    </ChatNav>
  );
};

export default PrivateConversationNav;
