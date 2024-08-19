import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status = response.statusCode || 500;
    const message =
      exception instanceof Error ? exception.message : 'Internal server error';

    this.logger.error(
      `HTTP ${status} - ${message}`,
      (exception as Error).stack
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
      stack: exception instanceof Error ? exception.stack : null,
    });
  }
}
