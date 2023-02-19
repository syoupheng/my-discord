import { Inject, UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { IDataLoaders } from '../dataloader/dataloader.interface';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
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

@Resolver((of) => Message)
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,
    private messagesNotificationsService: MessagesNotificationsService,
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {}

  @Query((returns) => MessagesResponse)
  @UseGuards(JwtAuthGuard)
  getMessages(
    @Context() ctx,
    @Args('channelId', { type: () => Int }) channelId: number,
    @Args('cursor', { nullable: true }) cursor?: string,
    @Args('limit', { nullable: true, defaultValue: 15, type: () => Int }) limit?: number,
  ): Promise<MessagesResponse> {
    return this.messagesService.findAll(ctx.req.user.id, channelId, { cursor, take: limit });
  }

  @Mutation((type) => Message)
  @UseGuards(JwtAuthGuard)
  sendMessage(@Args('sendMessageInput') input: SendMessageInput, @Context() ctx) {
    return this.messagesService.send(input, ctx.req.user.id);
  }

  @Mutation((type) => SuccessResponse)
  @UseGuards(JwtAuthGuard)
  deleteMessage(@Args('messageId', { type: () => Int }) messageId: number, @Context() ctx): Promise<SuccessResponse> {
    return this.messagesService.delete(messageId, ctx.req.user.id);
  }

  @Mutation((type) => String)
  @UseGuards(JwtAuthGuard)
  typingMessage(@Args('channelId', { type: () => Int }) channelId: number, @Context() ctx): Promise<string> {
    return this.messagesService.notifyTyping(channelId, ctx.req.user);
  }

  @Mutation((type) => String)
  @UseGuards(JwtAuthGuard)
  markMessagesAsRead(@Args('messagesIds', { type: () => [Int] }) messagesIds: number[], @Context() ctx): Promise<string> {
    return this.messagesNotificationsService.deleteMany(messagesIds, ctx.req.user.id);
  }

  @ResolveField('referencedMessage', (returns) => ReferencedMessage, { nullable: true })
  getReferencedMessage(@Parent() message: Message, @Context('loaders') loaders: IDataLoaders) {
    if (!message?.respondsToId) return null;
    return loaders.referencedMessagesLoader.load(message.respondsToId);
  }

  @Subscription((returns) => Message, {
    filter: ({ messageReceived }, variables) => messageReceived.membersIds.includes(variables.userId),
    resolve: ({ messageReceived }) => messageReceived.payload,
  })
  messageReceived(@Args('userId', { type: () => Int }) userId: number) {
    return this.pubSub.asyncIterator('messageReceived');
  }

  @Subscription((returns) => Message, {
    filter: ({ messageDeleted }, variables) => messageDeleted.membersIds.includes(variables.userId),
    resolve: ({ messageDeleted }) => messageDeleted.message,
  })
  messageDeleted(@Args('userId', { type: () => Int }) userId: number) {
    return this.pubSub.asyncIterator('messageDeleted');
  }

  @Subscription((returns) => TypingNotification, {
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
