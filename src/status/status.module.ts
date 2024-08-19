import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [StatusController],
  providers: [ConfigService],
})
export class StatusModule {}
