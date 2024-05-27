import * as winston from 'winston';

export const winstonConfig = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
});