import AuthDomain from './AuthDomain';
import { RegisterUserRequest } from './dto/RegisterUserDto';

describe('AuthDomain', () => {
  let authDomain: AuthDomain;

  beforeEach(() => {
    authDomain = new AuthDomain('CRYPTO_SECRET', 'JWT_SECRET', 1000 * 60);
  });

  describe('validateRequest', () => {
    it('should be successfully', () => {
      const request = new RegisterUserRequest({
        email: 'test@test.com',
        password: 'secret',
      });

      authDomain.validateRequest(request);
    });

    it('should throw InvalidRequestException', () => {
      const request = new RegisterUserRequest({
        email: 'test',
        password: '1',
      });

      try {
        authDomain.validateRequest(request);
      } catch (error) {
        expect(error.errors).toMatchObject([
          'email must be an email',
          'password must be longer than or equal to 6 characters',
        ]);
      }
    });
  });

  describe('buildUserRegister', () => {
    it('should return successfully', () => {
      const user = authDomain.buildUserRegister('test@test.com', 'password');
      expect(user).toMatchObject({
        email: 'test@test.com',
        password:
          '133ea313937661ffca82e8d295e91ea2a966e2a0cea5b01216f1eae547669009',
        tweets: [],
      });
    });
  });

  describe('encrypt', () => {
    it('should return successfully', () => {
      const user = authDomain.encrypt('password');
      expect(user).toEqual(
        '133ea313937661ffca82e8d295e91ea2a966e2a0cea5b01216f1eae547669009',
      );
    });
  });

  describe('generateToken', () => {
    it('should return successfully', () => {
      const token = authDomain.generateToken('_ID');
      expect(token).toBeDefined();
    });
  });
});
