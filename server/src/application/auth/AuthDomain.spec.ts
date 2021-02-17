import AuthDomain from './AuthDomain';
import { RegisterUserRequest } from './dto/RegisterUserDto';

describe('AuthDomain', () => {
  let authDomain: AuthDomain;

  beforeEach(() => {
    authDomain = new AuthDomain();
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
});
