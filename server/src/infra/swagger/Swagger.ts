import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

type Options = Pick<OpenAPIObject, 'openapi' | 'info' | 'servers' | 'security' | 'tags' | 'externalDocs'>;
export default class Swagger {
  private readonly options: Options;

  constructor(title: string, description: string, version: string) {
    this.options = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addTag('health', 'Operations about helth application')
      .addTag('auth', 'Operations about authentication')
      .addBearerAuth()
      .build();
  }

  setup(app: INestApplication, path: string): void {
    const document = SwaggerModule.createDocument(app, this.options);
    SwaggerModule.setup(path, app, document);
  }
}
