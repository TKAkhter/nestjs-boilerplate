import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class StatusController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getStatus() {
    const port = this.configService.get<number>('PORT') || 3000;
    return {
      status: 'Service is running',
      port,
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
