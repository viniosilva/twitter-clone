import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';
import MongoDB from '../../infra/mongodb/MongoDB';

@Injectable()
export default class MongoDbHealth extends HealthIndicator {
  constructor(private readonly mongodb: MongoDB) {
    super();
  }

  async pingCheck(key: string): Promise<HealthIndicatorResult> {
    const isConnected = this.mongodb.isConnected();
    const result = this.getStatus(key, isConnected);

    if (isConnected) {
      return result;
    }

    throw new HealthCheckError('Mongodb failed', result);
  }
}
