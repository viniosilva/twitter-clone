import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import MongoDbHealth from './MongoDbHealth';

@Controller('/api/health')
@ApiTags('health')
export default class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly mongodb: MongoDbHealth,
  ) {}

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return await this.health.check([() => this.mongodb.pingCheck('mongodb')]);
  }
}

// Ref: https://docs.nestjs.com/recipes/terminus
