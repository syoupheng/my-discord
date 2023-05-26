import { MESSAGE_NOTIFICATION_FRAGMENT } from "../../fragments/auth";
import { useFragment } from "../../gql";
import useAuthUserCache from "../auth/useAuthUserCache";

const useMessageNotifications = () => {
  const { newMessagesNotifications: newMessagesNotificationsFragment } = useAuthUserCache();
  const newMessagesNotifications = useFragment(MESSAGE_NOTIFICATION_FRAGMENT, newMessagesNotificationsFragment);
  return newMessagesNotifications;
};

export default useMessageNotifications;
