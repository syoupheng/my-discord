import { MessageFragment, PrivateConversationFragment, PrivateGroupFragment } from "@/gql/graphql";

export type PrivateChannelFragment = PrivateConversationFragment | PrivateGroupFragment;

export type ReferencedMessageFragment = MessageFragment["referencedMessage"];
