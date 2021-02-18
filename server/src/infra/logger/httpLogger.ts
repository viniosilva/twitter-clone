import { ServerResponse } from 'http';
import { Options } from 'pino-http';

type Level = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

export function customLogLevel(res: ServerResponse, err: Error): Level {
  if (res.statusCode >= 400 && res.statusCode < 500) return 'warn';
  else if (res.statusCode >= 500 || err) return 'error';
  return 'info';
}

export const httpLogger: Options = { customLogLevel };

// Ref: https://www.npmjs.com/package/pino-http
