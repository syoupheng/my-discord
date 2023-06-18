import { ChannelMemberFragment, PrivateGroupFragment } from "@/gql/graphql";
import { ChannelModel, ChannelType } from "@/models/channel/channel-model.interface";

export class PrivateGroupModel implements ChannelModel {
  private group: PrivateGroupFragment;

  constructor(group: PrivateGroupFragment) {
    this.group = group;
  }

  get type(): ChannelType {
    return "group";
  }

  get title(): string {
    return this.group.name ?? "";
  }

  get name(): string {
    return this.group.name ?? "";
  }

  get headerDescription(): string {
    return "Bienvenue au début du groupe privé";
  }

  get placeholderContent(): string {
    return `Envoyer un message dans ${this.title}`;
  }

  get displaySidebar(): boolean {
    return true;
  }

  get members(): readonly ChannelMemberFragment[] {
    return this.group.members;
  }

  get avatarColor(): string {
    return this.group.avatarColor;
  }
}
