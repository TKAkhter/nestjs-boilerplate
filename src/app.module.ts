import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { StatusController } from './status/status.controller';
import { StatusModule } from './status/status.module';
import { WinstonModule } from 'nest-winston';
import { winstonLogger } from './services/winston/logger';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    WinstonModule.forRoot({
      instance: winstonLogger,
    }),
    UsersModule,
    AuthModule,
    StatusModule,
  ],
  controllers: [StatusController],
})
export class AppModule {}