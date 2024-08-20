import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './common/http-exception';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes();
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT!);

  // Log additional details after the app has started
  const baseUrl = `http://localhost:${process.env.PORT!}`;
  Logger.log(`Application is running enviroment: ${process.env.NODE_ENV}`, 'Bootstrap');
  Logger.log(`Application is running on: ${baseUrl}`, 'Bootstrap');
}
bootstrap();
