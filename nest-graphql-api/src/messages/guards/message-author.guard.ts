import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { MessagesService } from '../messages.service';

@Injectable()
export class MessageAuthorGuard implements CanActivate {
  constructor(private messagesService: MessagesService) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { messageId } = ctx.getArgs();
    const userId = ctx.getContext().req.user.id;
    return this.messagesService.isAuthor(messageId, userId);
  }
}
