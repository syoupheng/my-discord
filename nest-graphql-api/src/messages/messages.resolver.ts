import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { IDataLoaders } from 'src/dataloader/dataloader.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SendMessageInput } from './dto/send-message.input';
import { Message } from './entities/message.entity';
import { ReferencedMessage } from './entities/referenced-message.entity';
import { MessagesService } from './messages.service';

@Resolver((of) => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Query((returns) => [Message], { name: 'messages' })
  @UseGuards(JwtAuthGuard)
  getMessages(
    @Context() ctx,
    @Args('channelId', { type: () => Int }) channelId: number,
    @Args('cursor', { nullable: true }) cursor?: string,
    @Args('limit', { nullable: true, defaultValue: 20, type: () => Int }) limit?: number,
  ) {
    return this.messagesService.findAll(ctx.req.user.id, channelId, { cursor, take: limit });
  }

  @Mutation((type) => Message)
  @UseGuards(JwtAuthGuard)
  sendMessage(@Args('sendMessageInput') input: SendMessageInput, @Context() ctx) {
    return this.messagesService.send(input, ctx.req.user.id);
  }

  @ResolveField('referencedMessage', (returns) => ReferencedMessage, { nullable: true })
  getReferencedMessage(@Parent() message: Message, @Context('loaders') loaders: IDataLoaders) {
    if (!message?.referencedMessageId) return null;
    return loaders.referencedMessagesLoader.load(message.referencedMessageId);
  }
}
