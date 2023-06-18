import { Injectable } from '@nestjs/common';
import { ChannelRepository } from '../prisma/repositories/channel.repository';
import { MessageRepository } from '../prisma/repositories/message.repository';

@Injectable()
export class MessagesNotificationsService {
  constructor(private messageRepository: MessageRepository, private channelRepository: ChannelRepository) {}

  async findAll(userId: number) {
    const messagesNotifications = await this.messageRepository.findUserMessagesNotifications(userId);
    const channelsIds = (await this.channelRepository.findManyByMemberId(userId)).map(({ channelId }) => channelId);
    return messagesNotifications.map((notif) => notif.message).filter((message) => channelsIds.includes(message.channelId));
  }

  async deleteMany(messagesIds: number[], userId: number) {
    await this.messageRepository.deleteMessagesNotifications(messagesIds, userId);
    return 'success';
  }
}
