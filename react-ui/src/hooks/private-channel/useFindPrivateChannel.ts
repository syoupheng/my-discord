import usePrivateGroups from "@/hooks/private-groups/usePrivateGroups";
import usePrivateConversations from "@/hooks/private-conversation/usePrivateConversations";
import useAuthUserInfo from "@/hooks/auth/useAuthUserInfo";
import { ChannelModel } from "@/models/channel/channel-model.interface";
import { isPrivateConversation, isPrivateGroup } from "@/utils/channel";
import { PrivateGroupModel } from "@/models/channel/private-group-model";
import { PrivateConversationModel } from "@/models/channel/private-conversation-model";

const useFindPrivateChannel = (channelId: number) => {
  const privateGroups = usePrivateGroups();
  const privateConversations = usePrivateConversations();
  const authUser = useAuthUserInfo();
  const channel = [...privateGroups, ...privateConversations].find((channel) => channel.id === channelId) ?? null;
  if (!channel) return { channel, channelModel: null };
  let channelModel: ChannelModel | null = null;
  if (isPrivateGroup(channel)) {
    channelModel = new PrivateGroupModel(channel);
  } else if (isPrivateConversation(channel)) {
    channelModel = new PrivateConversationModel(channel, authUser);
  }
  return { channel, channelModel };
};

export default useFindPrivateChannel;
