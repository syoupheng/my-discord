import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FriendRequestsModule } from './friend-requests/friend-requests.module';
import { FriendsModule } from './friends/friends.module';
import { PubsubModule } from './pubsub/pubsub.module';
import { PrivateConversationsModule } from './private-conversations/private-conversations.module';
import { DataloaderModule } from './dataloader/dataloader.module';
import { DataloaderService } from './dataloader/dataloader.service';
import { PrivateGroupsModule } from './private-groups/private-groups.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [DataloaderModule],
      inject: [DataloaderService],
      driver: ApolloDriver,
      useFactory: (dataloaderService: DataloaderService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        context: () => ({
          loaders: dataloaderService.getLoaders(),
        }),
        cors: {
          origin: process.env.CLIENT_URL ?? '*',
          credentials: true,
        },
        subscriptions: {
          'graphql-ws': true,
          'subscriptions-transport-ws': true,
        },
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    PrismaModule,
    AuthModule,
    FriendRequestsModule,
    FriendsModule,
    PubsubModule,
    PrivateConversationsModule,
    DataloaderModule,
    PrivateGroupsModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
