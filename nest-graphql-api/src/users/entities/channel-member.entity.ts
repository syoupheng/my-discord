import { ObjectType, PickType } from '@nestjs/graphql';
import { Friend } from '../../friends/entities/friends.entity';
import { BaseUser } from '../interfaces/base-user.interface';

@ObjectType({ implements: () => [BaseUser] })
export class ChannelMember implements BaseUser {
  id: number;

  username: string;

  createdAt: Date;
}
