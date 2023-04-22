import { PrivateConversation, PrivateGroup } from "../gql/graphql";
import { PrivateChannel } from "../types/channel";

export function isPrivateConversation(channel: PrivateChannel | null): channel is PrivateConversation {
  return channel?.__typename === "PrivateConversation";
}

export function isPrivateGroup(channel: PrivateChannel | null): channel is PrivateGroup {
  return channel?.__typename === "PrivateGroup";
}
