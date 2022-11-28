import { Navigate, Outlet, useParams } from "react-router-dom";
import usePrivateConversations from "../../hooks/private-conversation/usePrivateConversations";
import { DEFAULT_ROUTE } from "../../main";

const PrivateConversationGuard = () => {
  const params = useParams();
  const { data } = usePrivateConversations();
  if (!data) return null;
  const { privateConversations } = data.me;
  return privateConversations.some((conv) => conv.id === parseInt(params.conversationId!)) ? <Outlet /> : <Navigate to={DEFAULT_ROUTE} />;
};

export default PrivateConversationGuard;
