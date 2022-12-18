import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { IDataLoaders } from 'src/dataloader/dataloader.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SendMessageInput } from './dto/send-message.input';
import { Message } from './entities/message.entity';
import { ReferencedMessage } from './entities/referenced-message.entity';
import { MessagesService } from './messages.service';

@Resolver((of) => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

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
