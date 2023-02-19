import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AuthUser } from "../../gql/graphql";
import useAuthUser from "../../hooks/auth/useAuthUser";
import UnreadMessageNotificationItem from "./UnreadMessageNotificationItem";

const UnreadMessagesList = () => {
  const { data } = useAuthUser();
  if (!data) return null;
  const { newMessagesNotifications } = data.me as AuthUser;
  const notificationsMap: Record<number, number> = {};
  newMessagesNotifications.forEach(({ channelId }) => {
    const currentCount = notificationsMap[channelId];
    notificationsMap[channelId] = currentCount ? currentCount + 1 : 1;
  });

  const [listRef] = useAutoAnimate<HTMLDivElement>({ duration: 200 });

  return (
    <div ref={listRef}>
      {Object.entries(notificationsMap).map(([channelId, count]) => (
        <UnreadMessageNotificationItem key={channelId} channelId={parseInt(channelId)} count={count} />
      ))}
    </div>
  );
};

export default UnreadMessagesList;
