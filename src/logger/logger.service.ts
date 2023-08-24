import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { Log } from '@logger/interfaces/log.interface';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  logError(params: Log) {
    const timestamp = new Date().toISOString();
    const log = `${JSON.stringify({ ...params, timestamp })}`;

    this.error(log);
  }
}
