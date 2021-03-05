import AuthDomain from './AuthDomain';
import { RegisterUserRequest, RegisterUserResponse } from './dto/RegisterUserDto';
import UserRepository from '../../domain/user/UserRepository';
import { LoginRequest, LoginResponse } from './dto/LoginDto';
import { Logger } from 'pino';

export default class AuthService {
  constructor(
    private readonly authDomain: AuthDomain,
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
  ) {}

  async registerUser(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    this.logger
      .child({ request: this.authDomain.formatPassword(request) })
      .debug('AuthService.RegisterUserRequest');

    this.authDomain.validateRequest(new RegisterUserRequest(request));

    const iUser = this.authDomain.buildUserRegister(request.email, request.password);
    const { email } = await this.userRepository.create(iUser);
    const response = { email };

    this.logger.child({ response }).debug('AuthService.RegisterUserResponse');
    return response;
  }

  async login(request: LoginRequest): Promise<LoginResponse> {
    this.logger.child({ request: this.authDomain.formatPassword(request) }).debug('AuthService.LoginRequest');

    this.authDomain.validateRequest(new LoginRequest(request));

    const password = this.authDomain.encrypt(request.password);
    const { _id } = await this.userRepository.findByEmailAndPassword(request.email, password);

    const token = this.authDomain.generateToken(_id);

    this.logger.child({ response: { token: '******' } }).debug('AuthService.LoginResponse');

    return { token };
  }

  getUserIdFromJwtAuthorization(authorization: string): string {
    const userId = this.authDomain.getUserIdFromJwtAuthorization(authorization);
    return userId;
  }
}
