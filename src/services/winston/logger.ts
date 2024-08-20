import { utilities } from 'nest-winston';
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, errors } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

export const winstonLogger = createLogger({
  level: 'info',
  format: combine(timestamp(), errors({ stack: true }), logFormat),
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.align(),
        format.prettyPrint(),
        utilities.format.nestLike()
      ),
    }),
  ],
});
