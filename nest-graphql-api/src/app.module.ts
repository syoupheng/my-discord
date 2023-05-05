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
import { GraphQLError } from 'graphql';
import { ChatGptModule } from './chat-gpt/chat-gpt.module';
import { AvatarModule } from './avatar/avatar.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [DataloaderModule],
      inject: [DataloaderService],
      driver: ApolloDriver,
      useFactory: (dataloaderService: DataloaderService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        context: () => ({
          loaders: dataloaderService.getLoaders(),
        }),
        cors: {
          origin: process.env.CLIENT_URL,
          credentials: true,
        },
        subscriptions: {
          'graphql-ws': true,
          'subscriptions-transport-ws': true,
        },
        introspection: process.env.NODE_ENV === 'development',
        formatError: (error) => {
          if (error.extensions.code === 'INTERNAL_SERVER_ERROR') return new GraphQLError('Internal Server Error');
          return error;
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
    ChatGptModule,
    AvatarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
