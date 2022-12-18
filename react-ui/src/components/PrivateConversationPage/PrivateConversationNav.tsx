import { useParams } from "react-router-dom";
import useAuthUser from "../../hooks/auth/useAuthUser";
import { UserStatus } from "../../types/user";
import AddGroupMemberBtn from "../ChatSection/AddGroupMemberBtn";
import ChatNav from "../ChatSection/ChatNav";
import ArobasIcon from "../Icons/ArobasIcon";
import UserStatusIcon from "../shared/UserStatusIcon";

const PrivateConversationNav = () => {
  const { data } = useAuthUser();
  const { channelId: conversationId } = useParams();
  if (!data) return null;
  const { friends, privateConversations } = data.me;
  const conversation = conversationId ? privateConversations.find((conv) => conv.id === parseInt(conversationId)) : undefined;
  const friendData = friends.find((friend) => friend.id === conversation?.member.id);
  const userStatus: UserStatus = friendData?.status ?? "INVISIBLE";
  return (
    <ChatNav>
      <ChatNav.LeftSection>
        <div className="mx-2 h-6 w-auto basis-auto grow-0 shrink-0 text-channels-default">
          <ArobasIcon />
        </div>
        <div className="mr-2 shrink-0 grow-0 basis-auto">
          <h1 className="cursor-pointer whitespace-nowrap overflow-hidden flex justify-start items-center text-white font-medium text-[17px] leading-[22px]">
            {conversation?.member.username}
          </h1>
        </div>
        <div className="basis-auto shrink-0 grow-0 mr-2 flex items-center">
          <UserStatusIcon status={userStatus} size={10} />
        </div>
      </ChatNav.LeftSection>
      <ChatNav.RightSection>{!!friendData && <AddGroupMemberBtn currentMembersIds={[conversation?.member.id]} />}</ChatNav.RightSection>
    </ChatNav>
  );
};

export default PrivateConversationNav;
