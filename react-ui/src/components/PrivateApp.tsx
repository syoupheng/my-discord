import { ReactNode } from "react";
import useFriendReqDeletedSub from "../hooks/friend-requests/useFriendReqDeletedSub";
import useNewFriendRequestSub from "../hooks/friend-requests/useNewFriendRequestSub";

interface Props {
  children: ReactNode;
}

const PrivateApp = ({ children }: Props) => {
  useNewFriendRequestSub();
  useFriendReqDeletedSub();

  return <>{children}</>;
};

export default PrivateApp;
