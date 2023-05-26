import { useAutoAnimate } from "@formkit/auto-animate/react";
import UnreadMessageNotificationItem from "./UnreadMessageNotificationItem";

type Props = {
  countList: Array<[number, number]>;
};

const UnreadMessagesList = ({ countList }: Props) => {
  const [listRef] = useAutoAnimate<HTMLDivElement>({ duration: 200 });

  return (
    <div ref={listRef}>
      {countList.map(([channelId, count]) => (
        <UnreadMessageNotificationItem key={channelId} channelId={channelId} count={count} />
      ))}
    </div>
  );
};

export default UnreadMessagesList;
