import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { LoggerModule } from 'nestjs-pino';
import { httpLogger } from './infra/logger/httpLogger';
import AuthModule from './presentation/auth/AuthModule';
import { HealthController } from './presentation/health/HealthController';

@Module({
  imports: [
    TerminusModule,
    LoggerModule.forRoot({ pinoHttp: httpLogger }),
    AuthModule,
  ],
  controllers: [HealthController],
})
export default class AppModule {}
