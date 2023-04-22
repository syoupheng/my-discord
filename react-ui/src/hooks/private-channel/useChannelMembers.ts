import { ChannelMember } from "../../gql/graphql";
import { ChannelModel } from "../../models/channel-model.interface";
import { PrivateChannel } from "../../types/channel";
import { isPrivateConversation, isPrivateGroup } from "../../utils/channel";
import useAuthUser from "../auth/useAuthUser";

const useChannelMembers = (channel: ChannelModel): ChannelMember[] => {
  const { data } = useAuthUser();

  let groupMembers: ChannelMember[] = [];
  if (isPrivateConversation(channel) && data) {
    const { createdAt, username, id } = data.me;
    groupMembers = [channel.member, { createdAt, username, id }];
  } else if (isPrivateGroup(channel)) {
    groupMembers = channel.members;
  }

  return groupMembers;
};

export default useChannelMembers;
