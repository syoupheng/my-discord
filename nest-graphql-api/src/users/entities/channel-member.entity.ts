import { ObjectType } from '@nestjs/graphql';
import { BaseUser } from '../interfaces/base-user.interface';

@ObjectType({ implements: () => [BaseUser] })
export class ChannelMember implements BaseUser {
  id: number;

  username: string;

  discriminator: string;

  createdAt: Date;

  chatGptRole?: string | null;

  avatarColor: string;
}
