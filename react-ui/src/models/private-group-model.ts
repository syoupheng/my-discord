import { ChannelMember, PrivateGroup } from "../gql/graphql";
import { ChannelModel, ChannelType } from "./channel-model.interface";

export class PrivateGroupModel implements ChannelModel {
  private group: PrivateGroup;

  constructor(group: PrivateGroup) {
    this.group = group;
  }

  get type(): ChannelType {
    return "group";
  }

  get title(): string {
    return this.group.name;
  }

  get name(): string {
    return this.group.name;
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

  get members(): ChannelMember[] {
    return this.group.members;
  }
}
