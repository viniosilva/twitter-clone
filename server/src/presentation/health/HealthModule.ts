import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import mongodb from '../../infra/mongodb';
import HealthController from './HealthController';
import MongoDbHealth from './MongoDbHealth';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [
    { provide: MongoDbHealth, useFactory: () => new MongoDbHealth(mongodb) },
  ],
})
export default class HealthModule {}
