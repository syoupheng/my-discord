import { useEffect } from "react";
import useAuthUser from "../auth/useAuthUser";

const BASE_TITLE = "Discord";

const useDocumentTitle = (title: string) => {
  const { data } = useAuthUser();
  const numUnreadMessages = data ? data.me.newMessagesNotifications.length : 0;
  const numFriendRequests = data ? data.me.friendRequests.filter((req) => req.requestStatus === "RECEIVED").length : 0;
  const totalNewMessages = numFriendRequests + numUnreadMessages;
  useEffect(() => {
    if (!data) {
      document.title = BASE_TITLE;
    } else {
      document.title = (totalNewMessages ? `(${totalNewMessages})` : "•") + ` ${BASE_TITLE} | ${title}`;
    }
  }, [title, data]);
};

export default useDocumentTitle;
