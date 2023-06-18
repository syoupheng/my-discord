import { MdPeopleAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { isPrivateConversation } from "@/utils/channel";
import { FaDiscord } from "react-icons/fa";
import SidebarItem from "@/components/SideBar/SidebarItem";
import useFindPrivateChannel from "@/hooks/private-channel/useFindPrivateChannel";

type Props = {
  count: number;
  channelId: number;
}

const UnreadMessageNotificationItem = ({ count, channelId }: Props) => {
  const navigate = useNavigate();
  const { channelModel, channel } = useFindPrivateChannel(channelId);
  if (!channelModel || !count) return null;
  return (
    <SidebarItem
      onClick={() => {
        navigate(`/channels/@me/${channelId}`);
      }}
      tooltipTxt={channelModel.name}
      count={count}
      avatarColor={channelModel.avatarColor}
    >
      {isPrivateConversation(channel) ? <FaDiscord size={30} /> : <MdPeopleAlt size={24} />}
    </SidebarItem>
  );
};

export default UnreadMessageNotificationItem;
