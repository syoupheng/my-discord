import { Resolver } from '@nestjs/graphql';
import { FriendsService } from './friends.service';

@Resolver()
export class FriendsResolver {
  constructor(private readonly friendsService: FriendsService) {}
}
