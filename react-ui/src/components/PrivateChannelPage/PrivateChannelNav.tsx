import PrivateConversationNav from "@/components/PrivateConversationPage/PrivateConversationNav";
import PrivateGroupNav from "@/components/PrivateGroupPage/PrivateGroupNav";
import { PrivateChannelFragment } from "@/types/channel";
import { isPrivateConversation, isPrivateGroup } from "@/utils/channel";

type Props = {
  channel: PrivateChannelFragment;
}

const PrivateChannelNav = ({ channel }: Props) => {
  if (isPrivateConversation(channel)) return <PrivateConversationNav conversation={channel} />;
  if (isPrivateGroup(channel)) return <PrivateGroupNav group={channel} />;
  return null;
};

export default PrivateChannelNav;
