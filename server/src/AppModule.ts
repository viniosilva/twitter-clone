import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { httpLogger } from './infra/logger/httpLogger';
import AuthModule from './presentation/auth/AuthModule';
import HealthModule from './presentation/health/HealthModule';
import TweetModule from './presentation/tweet/TweetModule';

@Module({
  imports: [
    LoggerModule.forRoot({ pinoHttp: httpLogger }),
    HealthModule,
    AuthModule,
    TweetModule,
  ],
})
export default class AppModule {}
