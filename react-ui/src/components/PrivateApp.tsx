import useMessageDeletedSubscription from "@/hooks/chat-messages/useMessageDeletedSubscription";
import useMessageReceivedSubscription from "@/hooks/chat-messages/useMessageReceivedSubscription";
import useFriendReqDeletedSub from "@/hooks/friend-requests/useFriendReqDeletedSub";
import useNewFriendRequestSub from "@/hooks/friend-requests/useNewFriendRequestSub";
import useFriendChangeSub from "@/hooks/friends/useFriendChangeSub";
import useFriendConfirmedSub from "@/hooks/friends/useFriendConfirmedSub";
import useFriendDeletedSub from "@/hooks/friends/useFriendDeletedSub";
import useUpdatedGroupSubscription from "@/hooks/private-groups/useUpdatedGroupSubscription";
import useDynamicFavicon from "@/hooks/ui/useDynamicFavicon";
import useInactiveUser from "@/hooks/user/useInactiveUser";
import { PropsWithChildren } from "react";

const PrivateApp = ({ children }: PropsWithChildren) => {
  useNewFriendRequestSub();
  useFriendReqDeletedSub();
  useFriendConfirmedSub();
  useFriendDeletedSub();
  // useRefetchUserOnFocus(); TODO: fix performance problem
  useFriendChangeSub();
  useMessageReceivedSubscription();
  useMessageDeletedSubscription();
  useInactiveUser();
  useUpdatedGroupSubscription();

  useDynamicFavicon();

  return <>{children}</>;
};

export default PrivateApp;
