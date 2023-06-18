import { graphql } from "@/gql";
import { useQuery } from "@apollo/client";

export const GET_AUTH_USER_NOTIFICATIONS = graphql(`
  query GetNotifications {
    me {
      newMessagesNotifications {
        ...MessageNotification
      }
    }
  }
`);

const useMessageNotifications = () => {
  const { data } = useQuery(GET_AUTH_USER_NOTIFICATIONS, { fetchPolicy: "cache-only" });
  if (!data) throw new Error("This hook should be called in the authenticated part of the app");
  return data.me.newMessagesNotifications;
};

export default useMessageNotifications;
