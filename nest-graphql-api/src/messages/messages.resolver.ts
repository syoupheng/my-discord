import { Inject } from '@nestjs/common';
import { Args, Context, Int, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { IDataLoaders } from '../dataloader/dataloader.interface';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { MessagesResponse } from './dto/messages.response';
import { SendMessageInput } from './dto/send-message.input';
import { Message } from './entities/message.entity';
import { ReferencedMessage } from './entities/referenced-message.entity';
import { MessagesService } from './messages.service';
import { SuccessResponse } from '../auth/dto/success-response';
import { TypingNotification } from './dto/typing-notification.response';
import { MembersInChannels } from '@prisma/client';
import { UserTypingInput } from './dto/user-typing.input';
import { MessagesNotificationsService } from './messages-notifications.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthUser } from '../auth/entities/auth-user.entity';
import { Public } from '../auth/decorators/public.decorator';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,
    private messagesNotificationsService: MessagesNotificationsService,
    // @ts-expect-error need to upgrade nestjs ?
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {}

  @Query(() => MessagesResponse)
  getMessages(
    @CurrentUser() user: AuthUser,
    @Args('channelId', { type: () => Int }) channelId: number,
    @Args('limit', { nullable: true, defaultValue: 15, type: () => Int }) limit: number,
    @Args('cursor', { nullable: true }) cursor?: string,
  ): Promise<MessagesResponse> {
    return this.messagesService.findAll(user.id, channelId, { cursor, take: limit });
  }

  @Mutation(() => Message)
  sendMessage(@Args('sendMessageInput') input: SendMessageInput, @CurrentUser() user: AuthUser): Promise<Message> {
    return this.messagesService.send(input, user.id);
  }

  @Mutation(() => SuccessResponse)
  deleteMessage(@Args('messageId', { type: () => Int }) messageId: number, @CurrentUser() user: AuthUser): Promise<SuccessResponse> {
    return this.messagesService.delete(messageId, user.id);
  }

  @Mutation(() => String)
  typingMessage(@Args('channelId', { type: () => Int }) channelId: number, @CurrentUser() user: AuthUser): Promise<string> {
    return this.messagesService.notifyTyping(channelId, user);
  }

  @Mutation(() => String)
  markMessagesAsRead(@Args('messagesIds', { type: () => [Int] }) messagesIds: number[], @CurrentUser() user: AuthUser): Promise<string> {
    return this.messagesNotificationsService.deleteMany(messagesIds, user.id);
  }

  @ResolveField('referencedMessage', () => ReferencedMessage, { nullable: true })
  getReferencedMessage(@Parent() message: Message, @Context('loaders') loaders: IDataLoaders): Promise<ReferencedMessage> | null {
    if (!message?.respondsToId) return null;
    return loaders.referencedMessagesLoader.load(message.respondsToId);
  }

  @Public()
  @Subscription(() => Message, {
    filter: ({ messageReceived }, variables) => messageReceived.membersIds.includes(variables.userId),
    resolve: ({ messageReceived }) => messageReceived.payload,
  })
  messageReceived(@Args('userId', { type: () => Int }) userId: number) {
    return this.pubSub.asyncIterator('messageReceived');
  }

  @Public()
  @Subscription(() => Message, {
    filter: ({ messageDeleted }, variables) => messageDeleted.membersIds.includes(variables.userId),
    resolve: ({ messageDeleted }) => messageDeleted.message,
  })
  messageDeleted(@Args('userId', { type: () => Int }) userId: number) {
    return this.pubSub.asyncIterator('messageDeleted');
  }

  @Public()
  @Subscription(() => TypingNotification, {
    filter: (payload, { userTypingInput }: { userTypingInput: UserTypingInput }) => {
      const isMember = payload.membersInChannels.some((member: MembersInChannels) => member.memberId === userTypingInput.userId);
      if (userTypingInput.channelId) return payload.channelId === userTypingInput.channelId && isMember;
      return isMember;
    },
    resolve: ({ channelId, userId, username }) => ({ channelId, userId, username }),
  })
  userTyping(@Args('userTypingInput') input: UserTypingInput) {
    return this.pubSub.asyncIterator('userTyping');
  }
}
