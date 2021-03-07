import AuthDomain from './AuthDomain';
import { RegisterUserRequest, RegisterUserResponse } from './dto/RegisterUserDto';
import UserRepository from '../../domain/user/UserRepository';
import { LoginRequest, LoginResponse } from './dto/LoginDto';

export default class AuthService {
  constructor(private readonly authDomain: AuthDomain, private readonly userRepository: UserRepository) {}

  async registerUser(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    this.authDomain.validateRequest(new RegisterUserRequest(request));

    const iUser = this.authDomain.buildUserRegister(request.email, request.password);
    const { email } = await this.userRepository.create(iUser);
    const response = { email };

    return response;
  }

  async login(request: LoginRequest): Promise<LoginResponse> {
    this.authDomain.validateRequest(new LoginRequest(request));

    const password = this.authDomain.encrypt(request.password);
    const { _id } = await this.userRepository.findByEmailAndPassword(request.email, password);

    const token = this.authDomain.generateToken(_id);

    return { token };
  }

  getUserIdFromJwtAuthorization(authorization: string): string {
    const userId = this.authDomain.getUserIdFromJwtAuthorization(authorization);
    return userId;
  }
}
