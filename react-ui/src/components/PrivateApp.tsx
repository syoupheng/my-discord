import WelcomeModal from "@/components/WelcomeModal";
import { GetAuthUserQuery } from "@/gql/graphql";
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
import { OperationVariables, SubscribeToMoreOptions } from "@apollo/client";
import { PropsWithChildren } from "react";

export type AuthUserSubscriptionFunction = <TSubscriptionData = GetAuthUserQuery, TSubscriptionVariables = OperationVariables>(
  options: SubscribeToMoreOptions<GetAuthUserQuery, TSubscriptionVariables, TSubscriptionData>
) => () => void;

export type AuthUserSubscriptionParams = {
  authUserId: number;
  subscribeToMore: AuthUserSubscriptionFunction;
};

type Props = PropsWithChildren & AuthUserSubscriptionParams;

const PrivateApp = ({ children, authUserId, subscribeToMore }: Props) => {
  useNewFriendRequestSub({ authUserId, subscribeToMore });
  useFriendReqDeletedSub({ authUserId, subscribeToMore });
  useFriendConfirmedSub({ authUserId, subscribeToMore });
  useFriendDeletedSub({ authUserId, subscribeToMore });
  // useRefetchUserOnFocus(); TODO: fix performance problem
  useFriendChangeSub(authUserId);
  useMessageReceivedSubscription();
  useMessageDeletedSubscription(authUserId);
  useInactiveUser();
  useUpdatedGroupSubscription({ authUserId, subscribeToMore });

  useDynamicFavicon();
  return (
    <>
      <WelcomeModal />
      {children}
    </>
  );
};

export default PrivateApp;
