import { ChannelMember } from "../gql/graphql";

export type ChannelType = "group" | "conversation";

export interface ChannelModel {
  get title(): string;

  get name(): string;

  get headerDescription(): string;

  get placeholderContent(): string;

  get displaySidebar(): boolean;

  get type(): ChannelType;

  get members(): ChannelMember[];
}
