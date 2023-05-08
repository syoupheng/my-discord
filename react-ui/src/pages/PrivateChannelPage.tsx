import { Navigate, useParams } from "react-router-dom";
import MembersSidebar from "../components/PrivateGroupPage/MembersSidebar";
import useFindPrivateChannel from "../hooks/private-channel/useFindPrivateChannel";
import useDocumentTitle from "../hooks/ui/useDocumentTitle";
import DisplayGroupMembersProvider from "../providers/DisplayGroupMembersProvider";
import { isPrivateGroup } from "../utils/channel";
import { DEFAULT_ROUTE } from "../main";
import ChatContent from "../components/ChatSection/ChatContent";
import PrivateChannelContentContainer from "../components/PrivateChannelPage/PrivateChannelContentContainer";
import PrivateChannelNav from "../components/PrivateChannelPage/PrivateChannelNav";
import PrivateChannelProvider from "../providers/PrivateChannelProvider";
import useAuthUser from "../hooks/auth/useAuthUser";
import MessageItemScrollProvider from "../providers/MessageItemScrollProvider";

const PrivateChannelPage = () => {
  const { data } = useAuthUser();
  const { channelId } = useParams();
  const { channel, channelModel } = useFindPrivateChannel(parseInt(channelId!));
  useDocumentTitle(channelModel?.title ?? "");
  if (!channel || !channelModel || !data) return <Navigate to={DEFAULT_ROUTE} />;
  return (
    <div className="min-h-0 min-w-0 flex relative flex-col overflow-hidden flex-auto">
      <PrivateChannelProvider channel={channelModel}>
        <DisplayGroupMembersProvider>
          <PrivateChannelNav channel={channel} />
          <PrivateChannelContentContainer>
            <MessageItemScrollProvider>
              <ChatContent />
            </MessageItemScrollProvider>
            {channelModel.displaySidebar && <MembersSidebar members={isPrivateGroup(channel) ? channel.members : []} />}
          </PrivateChannelContentContainer>
        </DisplayGroupMembersProvider>
      </PrivateChannelProvider>
    </div>
  );
};

export default PrivateChannelPage;
