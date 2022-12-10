import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Message } from './entities/message.entity';
import { MessagesService } from './messages.service';

@Resolver((of) => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Mutation((type) => Message)
  @UseGuards(JwtAuthGuard)
  sendMessage() {}
}
