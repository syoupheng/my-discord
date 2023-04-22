import useAuthUser from "../auth/useAuthUser";
import { ChannelModel } from "../../models/channel-model.interface";
import { isPrivateConversation, isPrivateGroup } from "../../utils/channel";
import { PrivateGroupModel } from "../../models/private-group-model";
import { PrivateConversationModel } from "../../models/private-conversation-model";

const useFindPrivateChannel = (channelId: number | undefined) => {
  const { data } = useAuthUser();
  if (!data) return { channel: null, channelModel: null };
  const { privateConversations, privateGroups } = data.me;
  const channel = channelId ? [...privateGroups, ...privateConversations].find((channel) => channel.id === channelId) ?? null : null;
  let channelModel: ChannelModel;
  if (isPrivateGroup(channel)) {
    channelModel = new PrivateGroupModel(channel);
  } else if (isPrivateConversation(channel)) {
    channelModel = new PrivateConversationModel(channel, data.me);
  } else {
    throw new Error("This channel is not a valid type of channel !");
  }
  return { channel, channelModel };
};

export default useFindPrivateChannel;
