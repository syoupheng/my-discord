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

@Resolver((of) => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService, @Inject(PUB_SUB) private pubSub: PubSub) {}

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
}
