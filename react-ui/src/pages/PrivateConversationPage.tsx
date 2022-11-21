import { useParams } from "react-router-dom";
import AddMemberIcon from "../components/Icons/AddMemberIcon";
import ArobasIcon from "../components/Icons/ArobasIcon";
import UserStatusIcon from "../components/shared/UserStatusIcon";
import useAuthUser from "../hooks/auth/useAuthUser";
import { UserStatus } from "../types/user";

const PrivateConversationPage = () => {
  const { data } = useAuthUser();
  const { conversationId } = useParams();
  if (!data) return null;
  const { friends, privateConversations } = data.me;
  const conversation = conversationId ? privateConversations.find((conv) => conv.id === parseInt(conversationId)) : undefined;
  const userStatus: UserStatus = friends.find((friend) => friend.id === conversation?.member.id)?.status ?? "INVISIBLE";
  return (
    <div className="min-h-0 min-w-0 flex relative flex-col overflow-hidden flex-auto">
      <section className="basis-auto shrink-0 grow-0 relative z-50 flex items-center min-w-0 w-full h-12 px-2 cursor-default border-b border-tertiary">
        <div className="relative flex-auto flex items-center min-w-0 overflow-hidden">
          <div className="mx-2 h-6 w-auto basis-auto grow-0 shrink-0">
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
        </div>
        <div className="flex items-center basis-auto shrink-0 grow-0 min-w-0">
          <div className="mx-2 cursor-pointer basis-auto grow-0 shrink-0">
            <AddMemberIcon />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivateConversationPage;
