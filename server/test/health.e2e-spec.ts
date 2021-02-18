import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request, { Response } from 'supertest';
import AppModule from '../src/AppModule';

describe('HealthController (e2e)', () => {
  const path = '/api/health';
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /api/health', () => {
    it('should return successfully', () => {
      return request(app.getHttpServer())
        .get(path)
        .expect(200)
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });
  });
});
