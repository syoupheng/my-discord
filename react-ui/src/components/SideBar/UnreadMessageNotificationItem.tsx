import { MdPeopleAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useAuthUser from "../../hooks/auth/useAuthUser";
import SidebarItem from "./SidebarItem";

interface Props {
  count: number;
  channelId: number;
}

const UnreadMessageNotificationItem = ({ count, channelId }: Props) => {
  const navigate = useNavigate();
  const { data } = useAuthUser();
  if (!data) return null;
  const { privateGroups } = data.me;
  const channel = privateGroups.find((channel) => channel.id === channelId);
  if (!channel) return null;
  return (
    <SidebarItem
      onClick={() => {
        navigate(`/channels/@me/${channel.id}`);
      }}
      tooltipTxt={channel?.name}
      count={count}
      variant="red"
    >
      <MdPeopleAlt size={24} />
    </SidebarItem>
  );
};

export default UnreadMessageNotificationItem;
