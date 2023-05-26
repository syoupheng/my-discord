import { PrivateConversation, PrivateConversationFieldsFragment, PrivateGroup, PrivateGroupFieldsFragment } from "../gql/graphql";
import { PrivateChannel, PrivateChannelFieldsFragment } from "../types/channel";

export function isPrivateConversation(channel: PrivateChannel | PrivateChannelFieldsFragment | null): channel is PrivateConversation {
  return channel?.__typename === "PrivateConversation";
}

export function isPrivateGroup(channel: PrivateChannel | PrivateChannelFieldsFragment | null): channel is PrivateGroup {
  return channel?.__typename === "PrivateGroup";
}
