import { Field, ObjectType } from '@nestjs/graphql';
import { UserStatus } from '../../users/enums/user-status.enum';
import { BaseUser } from '../../users/interfaces/base-user.interface';

@ObjectType({ implements: () => [BaseUser] })
export class Friend implements BaseUser {
  id: number;

  username: string;

  createdAt: Date;

  avatarColor: string;

  @Field((type) => UserStatus)
  status: UserStatus;
}
