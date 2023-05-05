import { Injectable } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';

@Injectable()
export class LoggerService {
  private logger: any;

  constructor() {
    const logFormat = format.combine(format.timestamp(), format.json());

    const transport = new transports.File({
      filename: 'app.log',
      level: 'info',
      format: logFormat,
    });

    this.logger = createLogger({
      transports: [transport],
    });
  }

  log(message: string, context?: string) {
    this.logger.log('info', message, { context });
  }

  error(message: string, context?: string) {
    this.logger.log('error', message, { context });
  }
}
