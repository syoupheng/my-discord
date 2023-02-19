import { useEffect } from "react";
import useAuthUser from "../auth/useAuthUser";

const BASE_TITLE = "My Discord";

const useDocumentTitle = (title: string) => {
  const { data } = useAuthUser();
  const numUnreadMessages = data ? data.me.newMessagesNotifications.length : 0;
  useEffect(() => {
    if (!data) {
      document.title = BASE_TITLE;
    } else {
      document.title = (numUnreadMessages ? `(${numUnreadMessages})` : "•") + ` ${BASE_TITLE} | ${title}`;
    }
  }, [title, data]);
};

export default useDocumentTitle;
