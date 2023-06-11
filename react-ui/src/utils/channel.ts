import { PrivateConversationFragment, PrivateGroupFragment } from "@/gql/graphql";
import { PrivateChannelFragment } from "@/types/channel";

export function isPrivateConversation(channel: PrivateChannelFragment | null): channel is PrivateConversationFragment {
  return channel?.__typename === "PrivateConversation";
}

export function isPrivateGroup(channel: PrivateChannelFragment | null): channel is PrivateGroupFragment {
  return channel?.__typename === "PrivateGroup";
}
