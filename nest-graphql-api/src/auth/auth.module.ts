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
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from '../messages/messages.module';
import { AvatarModule } from '../avatar/avatar.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    UsersModule,
    FriendRequestsModule,
    FriendsModule,
    PassportModule,
    PrivateConversationsModule,
    PrivateGroupsModule,
    MessagesModule,
    ConfigModule,
    AvatarModule,
    JwtModule.register({
      signOptions: { expiresIn: process.env.JWT_EXP_TIME },
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
