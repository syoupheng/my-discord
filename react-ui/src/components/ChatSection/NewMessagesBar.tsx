import { RefObject, useState } from "react";
import { Message } from "../../gql/graphql";
import useMarkMessagesAsRead from "../../hooks/chat-messages/useMarkMessagesAsRead";
import { formatOldestNewMessageDate, getMillisecondsDiff } from "../../utils/dates";
import MarkAsReadIcon from "../Icons/MarkAsReadIcon";

interface Props {
  newMessagesRef: RefObject<HTMLDivElement>;
  unreadMessages: Message[];
}

const NewMessagesBar = ({ newMessagesRef, unreadMessages }: Props) => {
  const numUnreadMessages = unreadMessages.length;
  const [markAsRead, { loading }] = useMarkMessagesAsRead(unreadMessages.map(({ id }) => id));
  const scrollToNewMessages = () => {
    if (newMessagesRef.current) newMessagesRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const [clicked, setClicked] = useState(false);
  if (numUnreadMessages === 0) return null;
  const oldestUnreadMessage = unreadMessages.reduce((prev, current) => (getMillisecondsDiff(prev.createdAt, current.createdAt) > 0 ? current : prev));
  return (
    <div
      onClick={() => setClicked(true)}
      onAnimationEnd={() => {
        if (clicked) setClicked(false);
      }}
      className={`absolute top-0 left-4 right-4 rounded-b-lg text-white bg-blue flex items-center z-10 min-h-[24px] capitalize opacity-95 transition-opacity duration-150 ease-linear cursor-pointer hover:opacity-100 ${
        clicked ? "animate-clicked" : ""
      }`}
    >
      <button
        onClick={scrollToNewMessages}
        className="cursor-pointer whitespace-nowrap text-ellipsis overflow-hidden flex-auto block relative text-left bg-none appearance-none font-medium px-3 text-btw-sm-xs leading-6 h-6"
      >
        <span className="whitespace-nowrap text-ellipsis overflow-hidden">
          {numUnreadMessages} {numUnreadMessages > 1 ? "nouveaux messages" : "nouveau message"} depuis{" "}
          {formatOldestNewMessageDate(oldestUnreadMessage.createdAt)}
        </span>
      </button>
      <button
        onClick={() => {
          if (!loading) markAsRead();
        }}
        className="cursor-pointer grow-0 shrink-0 basis-auto font-semibold relative text-left bg-none appearance-none px-3 text-btw-sm-xs leading-6 h-6 flex items-center justify-start"
      >
        Marquer comme lu
        <div className="ml-2">
          <MarkAsReadIcon size={16} />
        </div>
      </button>
    </div>
  );
};

export default NewMessagesBar;
