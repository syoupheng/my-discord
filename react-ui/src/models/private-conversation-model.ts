import { AuthUser, ChannelMember, PrivateConversation } from "../gql/graphql";
import { ChannelModel, ChannelType } from "./channel-model.interface";

export class PrivateConversationModel implements ChannelModel {
  private conversation: PrivateConversation;

  private authUser: AuthUser;

  constructor(conversation: PrivateConversation, authUser: AuthUser) {
    this.conversation = conversation;
    this.authUser = authUser;
  }

  get type(): ChannelType {
    return "conversation";
  }

  get title(): string {
    return `@${this.conversation.member.username}`;
  }

  get name(): string {
    return this.conversation.member.username;
  }

  get headerDescription(): string {
    return "Ceci est le début de l'historique de tes messages privés avec";
  }

  get placeholderContent(): string {
    return `Envoyer un message à ${this.title}`;
  }

  get displaySidebar(): boolean {
    return false;
  }

  get members(): ChannelMember[] {
    const { createdAt, username, id, avatarColor } = this.authUser;
    return [this.conversation.member, { createdAt, username, id, avatarColor }];
  }

  get avatarColor(): string {
    return this.conversation.member.avatarColor;
  }
}
