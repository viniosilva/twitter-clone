import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request, { Response } from 'supertest';
import AppModule from '../src/AppModule';
import mongodb from '../src/infra/mongodb';

describe('AuthController (e2e)', () => {
  const path = '/api/auth';
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await mongodb.conn.collection('users').deleteMany({});
  });

  afterAll(async () => {
    await mongodb.disconnect();
  });

  describe('POST /api/auth', () => {
    it('should return the user', () => {
      const payload = { email: 'test@test.com', password: 'secret' };
      return request(app.getHttpServer())
        .post(path)
        .send(payload)
        .expect(201)
        .expect((res: Response) => {
          expect(res.text).toMatchSnapshot();
        });
    });

    it('should throw conflict exception', async () => {
      const payload = { email: 'test@test.com', password: 'secret' };
      await request(app.getHttpServer()).post(path).send(payload);

      return request(app.getHttpServer())
        .post(path)
        .send(payload)
        .expect(409)
        .expect((res: Response) => {
          expect(res.text).toMatchSnapshot();
        });
    });

    it('should throw bad request exception', () => {
      const payload = { email: 'test', password: '1' };
      return request(app.getHttpServer())
        .post(path)
        .send(payload)
        .expect(400)
        .expect((res: Response) => {
          expect(res.text).toMatchSnapshot();
        });
    });
  });
});
