import { PrivateChannel } from "../../types/channel";
import { isPrivateConversation, isPrivateGroup } from "../../utils/channel";
import PrivateConversationNav from "../PrivateConversationPage/PrivateConversationNav";
import PrivateGroupNav from "../PrivateGroupPage/PrivateGroupNav";

interface Props {
  channel: PrivateChannel;
}

const PrivateChannelNav = ({ channel }: Props) => {
  if (isPrivateConversation(channel)) return <PrivateConversationNav />;
  if (isPrivateGroup(channel)) return <PrivateGroupNav group={channel} />;
  return null;
};

export default PrivateChannelNav;
