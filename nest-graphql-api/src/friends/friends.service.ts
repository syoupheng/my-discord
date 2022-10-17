import { Injectable } from '@nestjs/common';
import { UserStatus } from '../users/enums/user-status.enum';
import { UsersService } from '../users/users.service';
import { Friend } from './entities/friends.entity';

@Injectable()
export class FriendsService {
  constructor(private usersService: UsersService) {}

  async findById(friendId: number): Promise<Friend> {
    const { id, username, status } = await this.usersService.findOneById(friendId);
    return { id, username, status: UserStatus[status] };
  }
}
