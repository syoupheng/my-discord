import useAuthUser from "@/hooks/auth/useAuthUser";
import { useEffect } from "react";

const BASE_TITLE = "Discord";

const useDocumentTitle = (title: string) => {
  const { data } = useAuthUser();
  let documentTitle = BASE_TITLE;
  if (data) {
    const numUnreadMessages = data.me.newMessagesNotifications.length;
    const numFriendRequests = data.me.friendRequests.filter((req) => req.requestStatus === "RECEIVED").length;
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
