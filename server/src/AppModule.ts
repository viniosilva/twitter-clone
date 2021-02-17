import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { LoggerModule } from 'nestjs-pino';
import { httpLogger } from './infra/logger/httpLogger';
import { HealthController } from './presentation/health/HealthController';

@Module({
  imports: [TerminusModule, LoggerModule.forRoot({ pinoHttp: httpLogger })],
  controllers: [HealthController],
})
export default class AppModule {}
