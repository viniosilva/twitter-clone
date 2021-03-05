import { ServerResponse } from 'http';
import { Options } from 'pino-http';
import pino, { LoggerOptions } from 'pino';
import { apiConfig } from '../../AppConfig';

const config = {
  base: { environment: apiConfig.environment },
  level: apiConfig.logLevel,
} as LoggerOptions;

type Level = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

export function customLogLevel(res: ServerResponse, err: Error): Level {
  if (res.statusCode >= 400 && res.statusCode < 500) return 'warn';
  else if (res.statusCode >= 500 || err) return 'error';
  return 'info';
}

export const httpLogger: Options = { ...config, customLogLevel };

export const logger = pino(config);

// Ref: https://www.npmjs.com/package/pino-http
