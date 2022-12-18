import { Navigate, useParams } from "react-router-dom";
import usePrivateConversations from "../hooks/private-conversation/usePrivateConversations";
import usePrivateGroups from "../hooks/private-groups/usePrivateGroups";
import { DEFAULT_ROUTE } from "../main";
import PrivateConversationPage from "./PrivateConversationPage";
import PrivateGroupPage from "./PrivateGroupPage";

const PrivateChannelPage = () => {
  const { channelId } = useParams();
  const { data: dataConversations } = usePrivateConversations();
  const { data: dataGroups } = usePrivateGroups();
  if (!dataGroups || !dataConversations) return null;
  const group = dataGroups.me.privateGroups.find(({ id }) => parseInt(channelId!) === id);
  const conversation = dataConversations.me.privateConversations.find(({ id }) => parseInt(channelId!) === id);

  if (group) return <PrivateGroupPage />;
  if (conversation) return <PrivateConversationPage />;
  return <Navigate to={DEFAULT_ROUTE} />;
};

export default PrivateChannelPage;
