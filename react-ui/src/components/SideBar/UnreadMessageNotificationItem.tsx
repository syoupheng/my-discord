import { MdPeopleAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useAuthUser from "../../hooks/auth/useAuthUser";
import SidebarItem from "./SidebarItem";
import useFindPrivateChannel from "../../hooks/private-channel/useFindPrivateChannel";

interface Props {
  count: number;
  channelId: number;
}

const UnreadMessageNotificationItem = ({ count, channelId }: Props) => {
  const navigate = useNavigate();
  const { channelModel } = useFindPrivateChannel(channelId);
  if (!channelModel) return null;
  return (
    <SidebarItem
      onClick={() => {
        navigate(`/channels/@me/${channelId}`);
      }}
      tooltipTxt={channelModel.name}
      count={count}
      variant="red"
    >
      <MdPeopleAlt size={24} />
    </SidebarItem>
  );
};

export default UnreadMessageNotificationItem;
