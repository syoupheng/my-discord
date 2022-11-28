import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './strategy/local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { FriendRequestsModule } from '../friend-requests/friend-requests.module';
import { FriendsModule } from '../friends/friends.module';
import { PrivateConversationsModule } from '../private-conversations/private-conversations.module';
import { PrivateGroupsModule } from '../private-groups/private-groups.module';

@Module({
  imports: [
    UsersModule,
    FriendRequestsModule,
    FriendsModule,
    PassportModule,
    PrivateConversationsModule,
    PrivateGroupsModule,
    JwtModule.register({
      signOptions: { expiresIn: process.env.JWT_EXP_TIME ?? '1d' },
      secret: process.env.JWT_SECRET ?? 'secret',
    }),
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
