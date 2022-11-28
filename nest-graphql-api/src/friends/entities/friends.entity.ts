import { ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Friend extends PickType(User, ['id', 'username', 'status']) {}
