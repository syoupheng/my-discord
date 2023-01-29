import { Fragment } from "react";
import useUserTypingNotification from "../../hooks/chat-messages/useUserTypingNotification";
import LoadingDotsIcon from "../Icons/LoadingDotsIcon";

const UserTypingNotification = () => {
  const usersTyping = useUserTypingNotification();
  const numberUsersTyping = usersTyping.length;
  if (numberUsersTyping === 0) return null;
  const getSeparator = (index: number) => {
    if (index === 0) return null;
    if (index === numberUsersTyping - 1) return " et ";
    return ", ";
  };
  return (
    <div className="overflow-visible absolute bottom-[1px] left-4 right-4 h-6 text-sm leading-6 resize-none flex items-center text-secondary-light">
      <div className="flex items-center overflow-hidden text-ellipsis">
        <div className="ml-2 pointer-events-none basis-auto grow-0 shrink-0 animate-pulse">
          <LoadingDotsIcon />
        </div>
        <span className="block min-w-0 whitespace-nowrap text-ellipsis overflow-hidden ml-1">
          {usersTyping.map(([userId, user], index) => (
            <Fragment key={userId}>
              {getSeparator(index)}
              <strong>{user.username}</strong>
            </Fragment>
          ))}
          {numberUsersTyping > 1 ? " sont" : " est"} en train d'écrire...
        </span>
      </div>
    </div>
  );
};

export default UserTypingNotification;
