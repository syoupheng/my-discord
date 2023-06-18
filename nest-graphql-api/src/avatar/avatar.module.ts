import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';

@Module({
  providers: [AvatarService],
  exports: [AvatarService],
})
export class AvatarModule {}
