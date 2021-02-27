import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request, { Response } from 'supertest';
import AppModule from '../src/AppModule';
import mongodb from '../src/infra/mongodb';
import UserModel from '../src/domain/user/UserModel';

describe('AuthController (e2e)', () => {
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

  describe('POST /api/auth/register', () => {
    it('should return the user', () => {
      const payload = { email: 'test@test.com', password: 'secret' };
      return request(app.getHttpServer())
        .post(registerPath)
        .send(payload)
        .expect(201)
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });

    it('should throw conflict exception', async () => {``
      const payload = { email: 'test@test.com', password: 'secret' };
      await request(app.getHttpServer()).post(registerPath).send(payload);

      return request(app.getHttpServer())
        .post(registerPath)
        .send(payload)
        .expect(409)
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });

    it('should throw bad request exception', () => {
      const payload = { email: 'test', password: '1' };
      return request(app.getHttpServer())
        .post(registerPath)
        .send(payload)
        .expect(400)
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });
  });

  describe('POST /api/auth/login', () => {
    const payload = { email: 'test@test.com', password: 'secret' };

    beforeEach(() => {
      return request(app.getHttpServer()).post(registerPath).send(payload);
    });

    it('should return successfully', async () => {
      return request(app.getHttpServer())
        .post(loginPath)
        .send(payload)
        .expect(200)
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot({ token: expect.any(String) });
        });
    });

    it('should throw user not found exception', async () => {
      const payload = { email: 'notfound@test.com', password: 'secret' };

      return request(app.getHttpServer())
        .post(loginPath)
        .send(payload)
        .expect(404)
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });

    it('should throw bad request exception', () => {
      const payload = { email: 'test', password: '1' };
      return request(app.getHttpServer())
        .post(loginPath)
        .send(payload)
        .expect(400)
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });
  });
});
