import { ReactNode } from "react";
import useNewFriendRequestSub from "../hooks/friend-requests/useNewFriendRequestSub";

interface Props {
  children: ReactNode;
}

const PrivateApp = ({ children }: Props) => {
  useNewFriendRequestSub();

  return <>{children}</>;
};

export default PrivateApp;
