import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { apiConfig } from './AppConfig';
import AppModule from './AppModule';
import swagger from './infra/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(helmet());

  swagger.setup(app, '/api/docs');

  await app.listen(apiConfig.port);

  const logger = app.get(Logger);
  logger.log(`App listening at [${apiConfig.host}:${apiConfig.port}]`);
}
bootstrap();
