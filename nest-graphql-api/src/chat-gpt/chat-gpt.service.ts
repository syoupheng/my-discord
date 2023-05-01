import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

@Injectable()
export class ChatGptService {
  constructor(private config: ConfigService) {}

  getClient() {
    const configuration = new Configuration({
      apiKey: this.config.get<string>('OPENAI_API_KEY'),
    });
    return new OpenAIApi(configuration);
  }

  createChatCompletion(messages: ChatCompletionRequestMessage[]) {
    const client = this.getClient();
    return client.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    });
  }
}
