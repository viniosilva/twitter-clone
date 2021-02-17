import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
} from '@nestjs/terminus';

@Controller('/api/health')
@ApiTags('health')
export class HealthController {
  constructor(private health: HealthCheckService) {}

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return await this.health.check([]);
  }
}

// Ref: https://docs.nestjs.com/recipes/terminus
