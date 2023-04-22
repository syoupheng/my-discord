import { PrivateConversation, PrivateGroup } from "../gql/graphql";

export type PrivateChannel = PrivateConversation | PrivateGroup;
