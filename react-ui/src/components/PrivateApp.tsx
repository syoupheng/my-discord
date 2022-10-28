import { ReactNode } from "react";
import useFriendReqDeletedSub from "../hooks/friend-requests/useFriendReqDeletedSub";
import useNewFriendRequestSub from "../hooks/friend-requests/useNewFriendRequestSub";
import useFriendConfirmedSub from "../hooks/friends/useFriendConfirmedSub";

interface Props {
  children: ReactNode;
}

const PrivateApp = ({ children }: Props) => {
  useNewFriendRequestSub();
  useFriendReqDeletedSub();
  useFriendConfirmedSub();

  return <>{children}</>;
};

export default PrivateApp;
