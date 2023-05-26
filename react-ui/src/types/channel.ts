import { PrivateConversation, PrivateConversationFieldsFragment, PrivateGroup, PrivateGroupFieldsFragment } from "../gql/graphql";

export type PrivateChannel = PrivateConversation | PrivateGroup;

export type PrivateChannelFieldsFragment = PrivateConversationFieldsFragment | PrivateGroupFieldsFragment;
