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

    it('should throw bad request exception', async () => {
      const registerPayload = {
        email: 'badtweet@test.com',
        password: 'secret',
      };
      await request(app.getHttpServer())
        .post(registerPath)
        .send(registerPayload);

      const response = await request(app.getHttpServer())
        .post(loginPath)
        .send(registerPayload);

      const token = response.body.token;

      const payload = { content: '' };
      return request(app.getHttpServer())
        .post(path)
        .set('Authorization', `Bearer ${token}`)
        .send(payload)
        .expect(400)
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });
  });

  describe('DELETE /api/tweets/:tweetId', () => {
    it('should be successfully', async () => {
      const registerPayload = {
        email: 'removetweet@test.com',
        password: 'secret',
      };
      await request(app.getHttpServer())
        .post(registerPath)
        .send(registerPayload);

      const registerResponse = await request(app.getHttpServer())
        .post(loginPath)
        .send(registerPayload);

      const token = registerResponse.body.token;

      const payload = { content: 'TEST' };
      const response = await request(app.getHttpServer())
        .post(path)
        .set('Authorization', `Bearer ${token}`)
        .send(payload);

      const tweetId = response.body._id;
      return request(app.getHttpServer())
        .delete(`${path}/${tweetId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(payload)
        .expect(204)
        .expect((res: Response) => {
          expect(res.body).toMatchObject({});
        });
    });
  });
});
