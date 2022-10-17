import { ObjectType, OmitType } from '@nestjs/graphql';
import { Friend } from '../../friends/entities/friends.entity';

@ObjectType()
export class FriendRequestParticipant extends OmitType(Friend, ['status']) {}
