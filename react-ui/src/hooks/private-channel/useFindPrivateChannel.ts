import { ChannelModel } from "../../models/channel-model.interface";
import { isPrivateConversation, isPrivateGroup } from "../../utils/channel";
import { PrivateGroupModel } from "../../models/private-group-model";
import { PrivateConversationModel } from "../../models/private-conversation-model";
import useAuthUserCache from "../auth/useAuthUserCache";
import { useFragment } from "../../gql";
import { PRIVATE_CONVERSATION_FRAGMENT, PRIVATE_GROUP_FRAGMENT } from "../../fragments/auth";

const useFindPrivateChannel = (channelId: number | undefined) => {
  const authUser = useAuthUserCache();
  const { privateConversations: privateConversationsFragment, privateGroups: privateGroupsFragment } = authUser;
  const privateConversations = useFragment(PRIVATE_CONVERSATION_FRAGMENT, privateConversationsFragment);
  const privateGroups = useFragment(PRIVATE_GROUP_FRAGMENT, privateGroupsFragment);
  const channel = channelId ? [...privateGroups, ...privateConversations].find((channel) => channel.id === channelId) ?? null : null;
  let channelModel: ChannelModel | null = null;
  if (isPrivateGroup(channel)) {
    channelModel = new PrivateGroupModel(channel);
  } else if (isPrivateConversation(channel)) {
    channelModel = new PrivateConversationModel(channel, authUser);
  }
  return { channel, channelModel };
};

export default useFindPrivateChannel;
