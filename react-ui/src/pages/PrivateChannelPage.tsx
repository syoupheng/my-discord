import ChatContent from "@/components/ChatSection/ChatContent";
import PrivateChannelContentContainer from "@/components/PrivateChannelPage/PrivateChannelContentContainer";
import PrivateChannelNav from "@/components/PrivateChannelPage/PrivateChannelNav";
import MembersSidebar from "@/components/PrivateGroupPage/MembersSidebar";
import useFindPrivateChannel from "@/hooks/private-channel/useFindPrivateChannel";
import useSafeParams from "@/hooks/shared/useSafeParams";
import useDocumentTitle from "@/hooks/ui/useDocumentTitle";
import { DEFAULT_ROUTE } from "@/main";
import DisplayGroupMembersProvider from "@/providers/DisplayGroupMembersProvider";
import MessageItemScrollProvider from "@/providers/MessageItemScrollProvider";
import PrivateChannelProvider from "@/providers/PrivateChannelProvider";
import { isPrivateGroup } from "@/utils/channel";
import { Navigate } from "react-router-dom";

const PrivateChannelPage = () => {
  const { channelId } = useSafeParams(["channelId"]);
  const { channel, channelModel } = useFindPrivateChannel(parseInt(channelId));
  useDocumentTitle(channelModel?.title ?? "");
  if (!channel || !channelModel) return <Navigate to={DEFAULT_ROUTE} />;
  return (
    <div className="min-h-0 min-w-0 flex relative flex-col overflow-hidden flex-auto">
      <PrivateChannelProvider channel={channelModel}>
        <DisplayGroupMembersProvider>
          <PrivateChannelNav channel={channel} />
          <PrivateChannelContentContainer>
            <MessageItemScrollProvider>
              <ChatContent key={channelId} />
            </MessageItemScrollProvider>
            {channelModel.displaySidebar && <MembersSidebar members={isPrivateGroup(channel) ? channel.members : []} />}
          </PrivateChannelContentContainer>
        </DisplayGroupMembersProvider>
      </PrivateChannelProvider>
    </div>
  );
};

export default PrivateChannelPage;
