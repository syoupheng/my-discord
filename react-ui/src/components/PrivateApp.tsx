import { ReactNode } from "react";
import useRefetchUserOnFocus from "../hooks/auth/useRefetchUserOnFocus";
import useMessageDeletedSubscription from "../hooks/chat-messages/useMessageDeletedSubscription";
import useMessageReceivedSubscription from "../hooks/chat-messages/useMessageReceivedSubscription";
import useFriendReqDeletedSub from "../hooks/friend-requests/useFriendReqDeletedSub";
import useNewFriendRequestSub from "../hooks/friend-requests/useNewFriendRequestSub";
import useFriendChangeSub from "../hooks/friends/useFriendChangeSub";
import useFriendConfirmedSub from "../hooks/friends/useFriendConfirmedSub";
import useFriendDeletedSub from "../hooks/friends/useFriendDeletedSub";

interface Props {
  children: ReactNode;
}

const PrivateApp = ({ children }: Props) => {
  useNewFriendRequestSub();
  useFriendReqDeletedSub();
  useFriendConfirmedSub();
  useFriendDeletedSub();
  useRefetchUserOnFocus();
  useFriendChangeSub();
  useMessageReceivedSubscription();
  useMessageDeletedSubscription();

  return <>{children}</>;
};

export default PrivateApp;
