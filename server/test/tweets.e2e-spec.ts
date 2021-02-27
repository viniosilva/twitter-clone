import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request, { Response } from 'supertest';
import AppModule from '../src/AppModule';
import mongodb from '../src/infra/mongodb';
import UserModel from '../src/domain/user/UserModel';

describe('TweetController (e2e)', () => {
  const path = '/api/tweets';
  const registerPath = '/api/auth/register';
  const loginPath = '/api/auth/login';

  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await UserModel.deleteMany();
  });

  afterAll(async () => {
    await mongodb.disconnect();
  });

  describe('POST /api/tweets', () => {
    it('should return the tweet', async () => {
      const registerPayload = { email: 'tweet@test.com', password: 'secret' };
      await request(app.getHttpServer())
        .post(registerPath)
        .send(registerPayload);

      const response = await request(app.getHttpServer())
        .post(loginPath)
        .send(registerPayload);

      const token = response.body.token;

      const payload = { content: 'TEST' };
      return request(app.getHttpServer())
        .post(path)
        .set('Authorization', `Bearer ${token}`)
        .send(payload)
        .expect(201)
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot({ createdAt: expect.any(String) });
        });
    });

    it('should throw forbiden exception when authorization is empty', () => {
      const payload = { content: 'TEST' };
      return request(app.getHttpServer())
        .post(path)
        .send(payload)
        .expect(403)
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });
  });
});
