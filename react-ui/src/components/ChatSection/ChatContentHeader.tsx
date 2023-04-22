import { usePrivateChannelContext } from "../../providers/PrivateChannelProvider";
import ChannelIcon from "../Icons/ChannelIcon";

const ChatContentHeader = () => {
  const channel = usePrivateChannelContext();
  return (
    <div className="flex flex-col justify-end m-4">
      <ChannelIcon size="lg" channelType={channel.type} />
      <h3 className="font-bold my-2 text-white text-[28px] leading-10">{channel.name}</h3>
      <div className="text-h-secondary text-btw-base-sm leading-5 font-normal">
        {channel.headerDescription} <strong>{channel.name}</strong>.
      </div>
    </div>
  );
};

export default ChatContentHeader;
