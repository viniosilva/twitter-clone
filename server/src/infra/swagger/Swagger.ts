import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default class Swagger {
  private readonly options: any;

  constructor(title: string, description: string, version: string) {
    this.options = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addTag('health', 'Operations about helth application')
      .addTag('auth', 'Operations about authentication')
      .build();
  }

  setup(app: INestApplication, path: string) {
    const document = SwaggerModule.createDocument(app, this.options);
    SwaggerModule.setup(path, app, document);
  }
}
