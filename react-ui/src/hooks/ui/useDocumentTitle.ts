import { useEffect } from "react";
import useAuthUser from "../auth/useAuthUser";
import { useFragment } from "../../gql";
import { AUTH_USER_FRAGMENT } from "../../fragments/auth";
import { FRIEND_REQUEST_FRAGMENT } from "../../fragments/auth";

const BASE_TITLE = "Discord";

const useDocumentTitle = (title: string) => {
  const { data } = useAuthUser();
  const authUser = useFragment(AUTH_USER_FRAGMENT, data ? data.me : null);
  const friendRequests = useFragment(FRIEND_REQUEST_FRAGMENT, data ? authUser.friendRequests : []);
  let documentTitle = BASE_TITLE;
  if (data) {
    const numUnreadMessages = authUser.newMessagesNotifications.length;
    const numFriendRequests = friendRequests.filter((req) => req.requestStatus === "RECEIVED").length;
    const totalNewMessages = numFriendRequests + numUnreadMessages;
    documentTitle = (totalNewMessages ? `(${totalNewMessages})` : "•") + ` ${BASE_TITLE} | ${title}`;
  }
  useEffect(() => {
    document.title = documentTitle;
    return () => {
      document.title = BASE_TITLE;
    };
  }, [documentTitle]);
};

export default useDocumentTitle;
