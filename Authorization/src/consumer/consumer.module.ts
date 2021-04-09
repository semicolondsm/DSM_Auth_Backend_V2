import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ConsumerController } from './consumer.controller';

@Module({
  providers: [ConsumerService],
  controllers: [ConsumerController]
})
export class ConsumerModule {}
